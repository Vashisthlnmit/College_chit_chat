import { ApiResponse } from "../Response/apiresponse.js";
import { ApiError } from "../Response/apierror.js";
import { messagemodel } from "../Models/Messagemodel.js";
import { asynchandler } from "../Helper/asynchandler.js";
import { chatmodel } from "../Models/Chatmodel.js";
import { uploadfile } from "../Helper/cloudinary.js";
import { emitsocketevent } from "../Socket/index.js";
import { chatevent } from "../constant.js";
import mongoose from "mongoose";
import { deletefile } from "../Helper/cloudinary.js";
import { io } from "../app.js";
// working fine all
export const addmessage=asynchandler(async(req,res)=>{
    const {chatid,content}=req.body;
    if(!chatid){
        throw new ApiError(400,"no chatid  found")
    }
    const findchat=await chatmodel.findOne({_id:chatid,participants:req.user._id});
    console.log(findchat);
    if(!findchat){
        throw new ApiError(400,"no such chat is found or your are not part");
    }
    //const check=findchat.Admin.equals(req.user._id)
    // if(!findchat.participants.includes(req.user._id) || !check){
    //     throw new ApiError(400,"you are no longer the participant of this chat");
    // }
    const response=await messagemodel.create({
        sender:req.user?._id,
        content:content,
        chat:chatid
    });
    if(req.file){
        const resp=await uploadfile(req.file.path);
        response.attachement=resp.url;
        await response.save();
    }
    findchat.lastMessage=response._id;
    await findchat.save();
    const message=await messagemodel.aggregate([
        {
            $match:{
                _id:new mongoose.Types.ObjectId(response._id)
            }
        },
        {
            $lookup:{
                from:"usermodels",
                foreignField:"_id",
                localField:"sender",
                as:"sender",
                pipeline:[
                    {
                        $project:{
                            username:1,
                            email:1,
                        }
                    }
                ]
            }
        },
        {
            $addFields:{
                sender:{$first:"$sender"}
            }
        }
    ])
    const receivedmessage=message[0];
    if(!receivedmessage){
        throw new ApiError(500,"internal server error");
    }
    findchat.participants.forEach((participantid)=>{
        if(participantid.equals(req.user._id))return;
        //if(participantid==req.user)return;
        emitsocketevent(io,participantid,chatevent.RECEIVEDrequest,receivedmessage);
})
return res.json(new ApiResponse(200,true,"message in chat add successfully",message));
})
export const deletemessage=asynchandler(async(req,res)=>{
    const {chatid,messageid}=req.params;
    console.log(chatid,messageid);
    if(!messageid || !chatid){
        throw new ApiError(400,"message or chat id is missing")
    }
    const chatinfo=await chatmodel.findById(chatid);
    if(!chatinfo){
        throw new ApiError(400,"no such chat exist");
    }
    const fullmessage=await messagemodel.findById(messageid);
    const check=fullmessage.sender.equals(req.user._id)
    if(!check){
        throw new ApiError(400,"you are not owner of this message");
    }
    if(fullmessage.attachement!=null){
        await deletefile(fullmessage.attachement);
    }
    const deleteresponse=await messagemodel.findByIdAndDelete(messageid);
    // todo:for updating the last message
    // if(chatinfo.lastMessage==messageid){

    // }
    chatinfo.participants.forEach((partid)=>{
        if(partid.equals(req.user._id))return;
        //if(partid==req.user._id)return;
        emitsocketevent(io,partid,chatevent.Deletedmesage,"user has deleted message")
    })
    return res.json(new ApiResponse(200,true,"the message has been deleted successfully"));
})
export const getallmessageofchat=asynchandler(async(req,res)=>{
    const {chatid}=req.params;
    if(!chatid){
        throw new ApiError(400,"chat id is missing");
    }
    const message=await messagemodel.aggregate([
        {
            $match:{
                chat:new mongoose.Types.ObjectId(chatid)
            }
        },
        {
            $lookup:{
                from:"usermodels",
                foreignField:"_id",
                localField:"sender",
                as:"sender",
                pipeline:[
                    {
                        $project:{
                            username:1,
                            email:1,
                        }
                    }
                ]
            }
        },
        {
            $sort:{createdAt:1}
        }

    ])
    if(!message){
        throw new ApiError(500,"some internal server error")
    }
    return res.json(new ApiResponse(200,true,"all message fetched successfully",message));
})
