import { ApiResponse } from "../Response/apiresponse.js";
import { ApiError } from "../Response/apierror.js";
import { chatmodel } from "../Models/Chatmodel.js";
import { asynchandler } from "../Helper/asynchandler.js";
import { chatevent } from "../constant.js";
import { emitsocketevent } from "../Socket/index.js";
import { Usermodel } from "../Models/Usermodel.js";
import { io } from "../app.js";
import mongoose from "mongoose";
export const Creategroupchat=asynchandler(async(req,res)=>{
    const {name,paractipants}=req.body;
    console.log(name,paractipants);
    if(!name || !paractipants){
        throw new ApiError(400,"name or paractipants required");
    }
    if(paractipants.includes(req.user._id.toString())){
        throw new ApiError(400,"user who is creating the group should not to included")
    }
    const members=[...new Set([...paractipants,req.user._id.toString()])];
    if(members<3){
        throw new ApiError(400,"cannot create the group chat with less than 3 member including you or you have entered duplicate");
    }
    const creategroupchat=await chatmodel.create({
        name:name,
        isgroup_chat:true,
        participants:members,
        Admin:req.user._id,
    })
    // send the response about group
    const findchat=await chatmodel.aggregate([
        {
            $match:{
                _id:creategroupchat._id
            },
            
        },
        {
            $project:{
                name:1,
                isgroup_chat:1,
                participants:1,
                Admin:1,
            }
        },
    ])
    if(!findchat){
        throw new ApiError(500,"internal server error")
    }
    console.log(findchat)
    members.forEach((id)=>{
        if(id.equals(req.user._id))return;
        // if(id==req.user._id) return;
        emitsocketevent(io,id,chatevent.Joined,"");
    })
    return res.json(new ApiResponse(200,true,"the group chat is created",findchat));

})
export const Createonetoonechat=asynchandler(async(req,res)=>{
    const {name,userid}=req.body;
    if(!name || !userid){
        throw new ApiError(400,"name for chat or user id is missing");
    }
    const createchat=await chatmodel.create({
        name:name,
        isgroup_chat:false,
    })
    const getcreatedchat=await chatmodel.findById(createchat);
    if(!getcreatedchat){
        throw new ApiError(400,"internal server error");
    }
    getcreatedchat.participants.push(req.user._id);
    getcreatedchat.participants.push(mongoose.Types.ObjectId(userid));
    await getcreatedchat.save();
    emitsocketevent(io,userid,chatevent.Joined,"");
    return res.json(new ApiResponse(200,true,"chat is created",getcreatedchat));
})
export const Addparticipants=asynchandler(async(req,res)=>{
    const {chatid,userid}=req.body
    if(!chatid || !userid){
        throw new ApiError(400,"chatid is missing or user id is missing");
    }
    const user=await Usermodel.findById(userid);
    const chat=await chatmodel.findById(chatid);
    if(!user || !chat){
        throw new ApiError(400,"either user or chat does not exist");
    }
    if(!chat.isgroup_chat){
        throw new ApiError(400,"member cannot be added this is not groupchat");
    }
    const check=chat.Admin.equals(req.user._id)
    if(!check){
        throw new ApiError(400,"your are not admin of a chat");
    }
    if(chat.participants.includes(userid)){
        throw new ApiError(400,"user already exist in chat");
    }
    chat.participants.push(userid);
    await chat.save();
    emitsocketevent(io,userid,chatevent.Joined,"")
    return res.json(new ApiResponse(200,true,"you have successfully added the member"));
    
})
export const removeparticipants=asynchandler(async(req,res)=>{
    const {chatid,userid}=req.body;
    if(!chatid || !userid){
        throw new ApiError(400,"chatid is missing or user id is missing");
    }
    const user=await Usermodel.findById(userid);
    const chat=await chatmodel.findById(chatid);
    if(!user && !chat){
        throw new ApiError(400,"either user or chat does not exist");
    }
    const check=chat.Admin.equals(req.user._id)
    if(!check){
        throw new ApiError(400,"your are not admin of a chat");
    }
    if(!chat.participants.includes(userid)){
        throw new ApiError(400,"user does not exist in chat");
    }
    chat.participants=chat.participants.filter((indx)=>indx!=userid);
    await chat.save();
    emitsocketevent(io,userid,chatevent.Removed,"")
    return res.json(new ApiResponse(200,true,"you have successfully removed the member"));
})
export const deltechat=asynchandler(async(req,res)=>{
    const {chatid}=req.params;
    if(!chatid){
        throw new ApiError(400,"chatid is missing");
    }
    const chat=await chatmodel.findById(chatid);
    if(!chat){
        throw new ApiError(400,"chat does not exist");
    }
    const check=chat.Admin.equals(req.user._id);
    if(!check){
        throw new ApiError(400,"your are not admin of a chat so you cannot delete chat");
    }
    await chatmodel.findByIdAndDelete(chatid);
    return res.json(new ApiResponse(200,true,"chat is deleted"));
})
export const renamechat=asynchandler(async(req,res)=>{
    const {chatid,newname}=req.body;
    console.log(chatid,newname);
    if(!chatid || !newname){
        throw new ApiError(400,"chatid is missing or new name is missing");
    }
    const chat=await chatmodel.findById(chatid);
    if(!chat){
        throw new ApiError(400," chat does not exist");
    }
    const check=chat.Admin.equals(req.user._id);
    if(!check){
        throw new ApiError(400,"your are not admin of a chat so you cannot rename chat");
    }
    const response=await chatmodel.findByIdAndUpdate(chatid,{
        $set:{
            name:newname
        }
    })
    if(!response){
        throw new ApiError(500,"internal server error")
    }
    chat.participants.forEach((idx)=>{
        if(idx==req.user._id)return;
        emitsocketevent(io,idx,chatevent.Updated,"");
    })
    return res.json(new ApiResponse(200,true,"you have successfully updated the chatname"));

    
})
export const availableuserofchat=asynchandler(async(req,res)=>{
    const {chatid}=req.params;
    if(!chatid){
        throw new ApiError(400,"chatid is missing");
    }
    const chat=await chatmodel.findById(chatid);
    if(!chat){
        throw new ApiError(400,"chat does not exist");
    }
    const check=chat.Admin.equals(req.user._id)
    const check2=chat.participants.includes(req.user._id)
    if(check2 || check){
        const id=new mongoose.Types.ObjectId(chatid);
        const user=await chatmodel.aggregate(
            [
                {
                    $match:{
                        _id:id
                    }
                },
                {
                    $unwind:"$participants"
                },
                {
                    $lookup:{
                        from:'usermodels',
                        localField:'participants',
                        foreignField:'_id',
                        as:'userdetails',
                        pipeline:[
                            {
                                $project:{
                                    username:1,
                                    email:1
                                }
                            }
                        ]
                    }
                }
            ]
        )
        if(!user){
            throw new ApiError(500,"internal server error");
        }
        return res.json(new ApiResponse(200,true,"you have successfully fetched users",user));
    }
    else{
        throw new ApiError(400,"you are not the part of this chat");
    }
    // todo - add admin to this user array generated 
})
export const getallchat=asynchandler(async(req,res)=>{
    const findallchat=await chatmodel.aggregate([
        {
            $match:{
                participants:{$elemMatch:{$eq:req.user._id}}
            }
        },{
            $project:{
                _id:1,
                name:1,
                isgroup_chat:1,
                Admin:1,
            }
        }

    ])
    if(!findallchat){
        throw new ApiError(500,"internal server error");
    }
    return res.json(new ApiResponse(200,true,"all chat findout succeesfully",findallchat));
})
export const leavechatgroup=asynchandler(async(req,res)=>{
    const {chatid,userid}=req.body;
    if(!chatid){
        throw new ApiError(400,"chatid is missing");
    }
    const chat=await chatmodel.findById(chatid);
    if(!chat){
        throw new ApiError(400,"chat does not exist");
    }
    if(!chat.isgroup_chat){
        throw new ApiError(400,"this is not a group chat");
    }
    if(!chat.participants.includes(userid)){
        throw new ApiError(400,"you are not the part of this chat");
    }
    chat.participants=chat.participants.filter((indx)=>!indx.equals(userid));
    await chat.save();
    chat.participants.forEach((idx)=>{
        emitsocketevent(io,idx,chatevent.Left,"");
    })
    return res.json(new ApiResponse(200,true,"you have successfully left the chat"));

})