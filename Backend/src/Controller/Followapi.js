import { ApiError } from "../Response/apierror.js";
import { ApiResponse } from "../Response/apiresponse.js";
import { asynchandler } from "../Helper/asynchandler.js";
import { Followmodel } from "../Models/Followmodel.js";
import { emitsocketevent } from "../Socket/index.js";
import { chatevent } from "../constant.js";
import mongoose from "mongoose";
import { io } from "../app.js";
import { Usermodel } from "../Models/Usermodel.js";
export const sendfollowfriend=asynchandler(async(req,res)=>{
    const {friendid}=req.params;
    if(!friendid){
        throw new ApiError(400,"friend id is missing");
    }
    const request=await Followmodel.findOne({owner:req.user._id,friend:friendid})
    if(request){
        throw new ApiError(400,"you have already sent a follow request to this user");
    }
    const templateofrequest=await Followmodel.create({
        owner:req.user?._id,
        friend:friendid,
        isaccepted:false
    })
    console.log(req.user._id);
    emitsocketevent(io,friendid,chatevent.Sendrequest,`you have follow request from `);
    return res.json(new ApiResponse(200,true,"friend request sent successfully"));
})
export const unfollowfriend=asynchandler(async(req,res)=>{
    const {followid}=req.params;
    if(!followid){
        throw new ApiError(400,"sorry no such user exist");
    }
    const response=await Followmodel.findByIdAndUpdate(followid);
    return res.json(new ApiResponse(200,true,"unfollow of the given user is successfull"));
})
export const follower=asynchandler(async(req,res)=>{
    const {id}=req.params;
    console.log(id);
    const mongoose_id=new mongoose.Types.ObjectId(id);
    const response=await Followmodel.aggregate([
        {
            $match:{
                 friend:mongoose_id,
                 isaccepted:true,
                
            }
        },
        {
            $lookup:{
                from:"usermodels",
                foreignField:"_id",
                localField:"owner",
                as:"friends",
                pipeline:[
                    {
                        $project:{
                            _id:1,
                            username:1,
                            email:1,
                        }
                    }
                ]
            }
        }
    ])
    return res.json(new ApiResponse(200,true,"the data fetched successfully",response));
})
export const noofollower=asynchandler(async(req,res)=>{
    const {id}=req.params;
    const mongoose_id=new mongoose.Types.ObjectId(id);
    const response=await Followmodel.aggregate([
        {
            $match:{
                friend:mongoose_id,
                isaccepted:true,
            },
            
        },
        {
            $count:"follower_count"
        }
    ])
    return res.json(new ApiResponse(200,true,"the data fetched successfully",response));
})
export const following=asynchandler(async(req,res)=>{
    const {id}=req.params;
    const mongoose_id=new mongoose.Types.ObjectId(id);
    const response=await Followmodel.aggregate([
        {
            $match:{
                owner:mongoose_id,
                isaccepted:true,
            }
        },
        {
            $lookup:{
                from:"usermodels",
                foreignField:"_id",
                localField:"friend",
                as:"friends",
                pipeline:[
                    {
                        $project:{
                            username:1,
                            email:1,
                        }
                    }
                ]
            }
        }
    ])
    return res.json(new ApiResponse(200,true,"the data fetched successfully",response));
})
export const noofollowing=asynchandler(async(req,res)=>{
    const {id}=req.params;
    const mongoose_id=new mongoose.Types.ObjectId(id);
    const response=await Followmodel.aggregate([
        {
            $match:{
                owner:mongoose_id,
                isaccepted:true,
            },
            
        },
        {
            $count:"following_count"
        }
    ])
    return res.json(new ApiResponse(200,true,"the data fetched successfully",response));
})
export const getallfollowrequestofuser=asynchandler(async(req,res)=>{
    //const response=await Followmodel.find({friend:req.user._id,isaccepted:false});
    const response=await Followmodel.aggregate([
        {
            $match:{
                friend:new mongoose.Types.ObjectId(req.user._id)
            }   
        },
        {
            $match:{
                isaccepted:false,
            }
        },
        {
            $lookup:{
                from:"usermodels",
                foreignField:"_id",
                localField:"owner",
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
        }
    ])
    return res.json(new ApiResponse(200,true,"all pending request fetched successfully",response));
})
export const acceptfollowrequest=asynchandler(async(req,res)=>{
    const {followrequestid}=req.params;
    if(!followrequestid){
        throw new ApiError(400,"follow request id is missing");
    }
    let owner=null;
    const response=await Followmodel.findById(followrequestid);
    if(!response){
        return new ApiError(400,"there is no such follow request");
    }
    owner=response.owner;
    response.isaccepted=true;
    await response.save();
    emitsocketevent(io,owner,chatevent.Acceptrequest,`your friend request is accepted by ${req.user.username}`);
    return res.json(new ApiResponse(200,true,"accepting the request proccess has been completed"));
})
export const givingpermissiotoviewaccount=asynchandler(async(req,res)=>{
    const {friendid}=req.body;
    const friendprofile=await Usermodel.findById(friendid);
    if(!friendprofile){
        throw new ApiError(400,"friend profile not found");
    }
    if(friendprofile.Account_type=="Public"){
        return res.json(new ApiResponse(200,true,"you can access the post"));
    }
    const followrequest=await Followmodel.findOne({owner:req.user._id,friend:friendid,isaccepted:true});
    if(!followrequest){
        return res.json(new ApiResponse(200,false,"you cannot access the post of this account"));
    }
    else{
        return res.json(new ApiResponse(200,true,"you can access the post"));
    }
})