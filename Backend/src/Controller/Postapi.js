import { ApiError } from "../Response/apierror.js";
import { ApiResponse } from "../Response/apiresponse.js";
import { asynchandler } from "../Helper/asynchandler.js";
import { Postmodel } from "../Models/Post.js";
import { uploadfile } from "../Helper/cloudinary.js";
import mongoose from "mongoose";
import { Followmodel } from "../Models/Followmodel.js";
export const addpost = asynchandler(async (req, res) => {
    const { title, Description } = req.body;
    if (!req.file) {
        throw new ApiError(200, "video or image is required to create post");
    }
    const cloudinaryresponse = await uploadfile(req.file.path);
    console.log(cloudinaryresponse);
    if (!cloudinaryresponse) {
        throw new ApiError(500, "failed to upload on server");
    }
    const response = await Postmodel.create({
        post: cloudinaryresponse?.url,
        title: title,
        Description: Description,
        owner: req.user._id
    })
    return res.json(new ApiResponse(200, true, "post has been created succesfully"))
})
export const noofpostbyuser = asynchandler(async (req, res) => {
    const id = req.params;
    const mongoose_id = new mongoose.Types.ObjectId(id);
    const userpost = await Postmodel.aggregate([
        {
            $match: {
                owner: mongoose_id
            }
        },
        {
            $count: 'postcount'
        }
    ])
    if (!userpost) {
        throw new ApiError(500, "internal server error")
    }
    console.log(userpost);
    // return new ApiResponse(200,true,"post of user fetched successfully",userpost)
    return res.json(new ApiResponse(200, true, "post of user fetched successfully", userpost))

})
export const allpostbyuser = asynchandler(async (req, res) => {
    const {id} = req.params;
    const mongoose_id = new mongoose.Types.ObjectId(id);
    const userpost = await Postmodel.aggregate([
        {
            $match: {
                owner: mongoose_id
            }
        },
    ])
    return res.json(new ApiResponse(200, true, "post of user fetched successfully", userpost))

})
export const deletepost = asynchandler(async (req, res) => {
    const { postid } = req.params;
    console.log(postid);
    if (!postid) {
        throw new ApiError(400, "post id is missing")
    }
    const del = await Postmodel.findByIdAndDelete(postid);
    console.log(del);
    return res.json(new ApiResponse(200, true, "your post has been deleted successfully", del));
})
export const allpostoffollowing = asynchandler(async (req, res) => {
    const id = req.user._id;
    const mongoose_id = new mongoose.Types.ObjectId(id);
    // const allpost = await Followmodel.aggregate([
    //     {
    //         $match: {
    //             owner: mongoose_id
    //         }
    //     },
    //     {

    //         $lookup: {
    //             from: "usermodels",
    //             localField: "friend",
    //             foreignField: "_id",
    //             as: "friends",
    //             pipeline: [
    //                 {
    //                     $project: {
    //                         username: 1,
    //                         email: 1,
    //                     }
    //                 }
    //             ]
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: "postmodels",
    //             localField: "friend",
    //             foreignField: "owner",
    //             as: "post"
    //         }
    //     },
    //     // {
    //     //     $unwind: "$post",
    //     // },
    //     {
    //         $sort:{createdAt:-1}
    //     }


    // ])
    const allpost = await Followmodel.aggregate([
        {
            $match: {
                owner: mongoose_id
            }
        },
        {
            $lookup: {
                from: "usermodels",
                localField: "friend",
                foreignField: "_id",
                as: "friends",
                pipeline: [
                    {
                        $project: {
                            username: 1,
                            email: 1
                        }
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "postmodels",
                localField: "friend",
                foreignField: "owner",
                as: "posts"
            }
        },
        {
            $group: {
                _id: "$friend",
                friendDetails: { $first: { $arrayElemAt: ["$friends", 0] } },
                posts: { $push: "$posts" }
            }
        },
        {
            $project: {
                _id: 0,
                friendDetails: 1,
                posts: { $arrayElemAt: ["$posts", 0] }
            }
        },
        {
            $sort: { "posts.createdAt": -1 }
        }
    ]);
    
    if (!allpost) {
        throw new ApiError(500, "internal server error")
    }
    return res.json(new ApiResponse(200, true, "all post of following fetched successfully", allpost));
})
