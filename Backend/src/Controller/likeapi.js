import { ApiResponse } from "../Response/apiresponse.js";
import { asynchandler } from "../Helper/asynchandler.js";
import { Postmodel } from "../Models/Post.js";
import { chatevent } from "../constant.js";
import { emitsocketevent } from "../Socket/index.js";
import mongoose from "mongoose";
import { likemodel } from "../Models/like.js";
import { ApiError } from "../Response/apierror.js";
export const togglelike=asynchandler(async(req,res)=>{
    const {postid}=req.body;
    if(!postid){
        throw new ApiError(400,"post id is missing")
    }
    const response=await likemodel.findOne({likedby:req.user._id,Post:postid});
    const postinfo=await Postmodel.findById(postid);
    if(!postinfo){
        throw new ApiError(400,"the post does not exist");
    }
    if(!response){
        const likepost=await likemodel.create({
            Post:postid,
            likedby:req.user._id
        })
        emitsocketevent(io,postinfo.owner,chatevent.Liked,`the ${req.user.username} has liked your post`);
        return  res.json(new ApiResponse(200,true,"the liked successfully"));
    }
    else{
        const resp=await likemodel.findByIdAndDelete(response._id);
        return res.json(new ApiResponse(200,false,"the disliked successfully"));
    }
})
export const nooflike=asynchandler(async(req,res)=>{
    const {postid}=req.body;
    if(!postid){
        throw new ApiError(400,"the post id is missing")
    }
    const like=await likemodel.aggregate(
        [
            {
                $match:{
                    Post:new mongoose.Types.ObjectId(postid)
                }
            },
            {
                $count:"no_like"
            }
        ]
    )
    if(!like){
        throw new ApiError(500,"internal server error");
    }
    return res.json(new ApiResponse(200,true,"no_like_fetched",like));
})