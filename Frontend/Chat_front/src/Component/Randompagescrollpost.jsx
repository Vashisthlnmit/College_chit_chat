import React, { useState, useEffect } from "react";
import { MessageCircle } from 'lucide-react';
import { Heart } from 'lucide-react';
import { useDispatch } from "react-redux";
import { randompostonmainpage } from "../store/Slice/Authentication";
import { allcommentonpost } from "../store/Slice/CommentSlice";
import Comments from "./AllComments";
import { useNavigate } from "react-router";

export default function PageScrollpost() {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const [post, setpost] = useState([]);
    const [comments, setcomments] = useState([]);
    const [selectedPostId, setSelectedPostId] = useState(null);
    // async function handlecomment(userpostid) {
    //     setSelectedPostId(userpostid);
    //     const resp = await dispatch(allcommentonpost({ postid: userpostid }))
    //     console.log(resp);
    //     setcomments(resp?.payload?.data.data)
    // }
    async function handlePost() {
        const resp = await dispatch(randompostonmainpage());
        console.log(resp);
        setpost(resp.payload.data.data);
    }
    useEffect(() => {
        handlePost()
    }, [])
    return (
        <>
            <div className="min-h-screen  bg-white">
                <div className="flex flex-col w-full justify-center">
                {
                    post.map((content) => (
                        content?.posts?.length > 0 && (
                            content?.posts?.map((imag) => (
                                <div key={imag?._id} className="m-2">
                                    <div className="card bg-base-100 w-96 shadow-xl">
                                        <figure>
                                            {
                                                 imag?.post?.includes("image")? <img src={imag?.post} /> : <video src={imag?.post} controls />
                                            }
                                        </figure>
                                        <div className="card-body">
                                            <h2 className="card-title">
                                                {imag?.title}
                                                {/* //<button onClick={()=>(navigate('/profile',{state:{userid:content?.friendDetails?._id, name:content?.friendDetails?.username}}))}>{content?.friendDetails?.username}</button> */}
                                                {/* <button onClick={()=>navigate('/profile',{state:{userid:content?.friendDetails?._id, name:content?.friendDetails?.username}})}>{content?.friendDetails?.username}</button> */}
                                                <div className="badge badge-secondary" onClick={()=>navigate('/profile',{state:{userid:content?.friendDetails?._id, name:content?.friendDetails?.username}})}>{content?.friendDetails?.username}</div>
                                            </h2>
                                            <p>{imag?.Description}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                            )
                        )))
                }
                </div>
            </div>
        </>
    )
}