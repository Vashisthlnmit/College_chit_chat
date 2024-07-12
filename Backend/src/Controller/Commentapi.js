import { ApiError } from "../Response/apierror.js";
import { ApiResponse } from "../Response/apiresponse.js";
import { asynchandler } from "../Helper/asynchandler.js";
import { Postmodel } from "../Models/Post.js";
import { Commentmodel } from "../Models/comment.js";
import { chatevent } from "../constant.js";
import { emitsocketevent } from "../Socket/index.js";
import  { io } from "../app.js";
import mongoose from "mongoose";
// all are working fine
export const addcomment = asynchandler(async (req, res) => {
    const { comment, Postid } = req.body;
    if (!comment || !Postid) {
        throw new ApiError(400, "comment or post is missing");
    }
    const findpost = await Postmodel.findById(Postid);
    if (!findpost) {
        throw new ApiError(400, "no such post exist");
    }
    const addcomment = await Commentmodel.create({
        comment: comment,
        Post: Postid,
        owner: req.user._id
    })
    emitsocketevent(io, findpost.owner, chatevent.Commented, `the ${req.user.username} has commented on your post`)
    return res.json(new ApiResponse(200, true, "comment on your post has been added successfully"));
})
export const deletecomment = asynchandler(async (req, res) => {
    const { commentid } = req.params;
    if (!commentid) {
        throw new ApiError(400, "comment id is missing");
    }
    const findcomment = await Commentmodel.findById(commentid);
    if (!findcomment) {
        throw new ApiError(400, "no such comment found")
    }
    const check=findcomment.owner.equals(req.user._id);
    if (!check) {
        throw new ApiError(400, "you are not adhere to this comment");
    }
    const deletecomment = await Commentmodel.findByIdAndDelete(commentid);
    return res.json(new ApiResponse(200, true, "the commented is deleted successfully"));
})
export const noofcommentonpost = asynchandler(async (req, res) => {
    const { postid } = req.params;
    if (!postid) {
        throw new ApiError(400, "post id not found");
    }
    const totalcomment = await Commentmodel.aggregate(
        [
            {
                $match: {
                    Post: new mongoose.Types.ObjectId(postid)
                }
            },
            {
                $count: "no_of_comment"
            }
        ]
    )
    if (!totalcomment) {
        throw new ApiError(500, "internal server error");
    }
    return res.json(new ApiResponse(200, true, "comment count fetched successfully", totalcomment))

})
export const allcommentonpost = asynchandler(async (req, res) => {
    const { postid } = req.params;
    if (!postid) {
        throw new ApiError(400, "post id not found");
    }
    const totalcomment = await Commentmodel.aggregate(
        [
            {
                $match: {
                    Post: new mongoose.Types.ObjectId(postid)
                }
            },
            {
                $lookup: {
                    from: "usermodels",
                    foreignField: "_id",
                    localField: "owner",
                    as: "friend",
                    pipeline: [
                        {
                            $project: {
                                username: 1,
                                email: 1,
                            }
                        }
                    ]
                }
            }
        ]
    )
    if (!totalcomment) {
        throw new ApiError(500, "internal server error");
    }
    return res.json(new ApiResponse(200, true, "comment fetched successfully", totalcomment))
})
export const commentbyuser = asynchandler(async (req, res) => {
    const allcommentbyuser = await Commentmodel.aggregate(
        [
            {
                $match: {
                    owner: new mongoose.Types.ObjectId(req.user._id)
                }
            }
        ]
    )
    if (!allcommentbyuser) {
        throw new ApiError(500, "internal server error");
    }
    return res.json(new ApiResponse(200, true, "comment by user fetched successfully", allcommentbyuser));
})