import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { allpostbyuser } from '../store/Slice/Poststuff';
import { ThumbsUp, MessageSquare } from 'lucide-react';
import { useLocation } from 'react-router';
import { allcommentonpost, nocommentonpost } from '../store/Slice/CommentSlice';
import { Trash } from 'lucide-react';
import { deletepost } from '../store/Slice/Poststuff';
export default function Postpage() {
    const dispatch = useDispatch();
    const location = useLocation();
    const [posts, setPosts] = useState([]);
    const [commenttoggle, setcommenttoggle] = useState(false);
    const [allcomments, setallcomments] = useState([]);
    const [nocomment, setnocomment] = useState(0);
    async function allcommentsdetails(id) {
        const resp = await dispatch(allcommentonpost({ postid: id }))
        console.log(resp);
        setallcomments(resp1?.payload?.data?.data);
    }
    async function countnocomments(postid) {
        const resp = await dispatch(nocommentonpost({ postid: postid }))
        console.log(resp);
        // return resp;
    }
    async function handletoggle(postid) {
        setcommenttoggle(!commenttoggle);
        if (commenttoggle) {
            const [resp1, resp2] = await Promise.all([allcommentsdetails(postid), countnocomments(postid)]);
            console.log();
            setallcomments(resp1?.payload?.data?.data);
            if (resp2?.payload?.data?.data.length > 0) {
                setnocomment(resp2?.payload?.data?.data[0].no_of_comment);
            }
        }
    }
    async function handlepost() {
        const response = await dispatch(allpostbyuser({ id: location.state?.userid }));
        setPosts(response?.payload?.data?.data);
        console.log(response);
    }
    async function confirmation(posid){
        const answer=window.confirm("are you want to delete this message");
        if(answer){
            const resp=await dispatch(deletepost({ postid: posid }))
            console.log(resp);
            if(resp?.payload?.data?.success){
                toast.success("Post deleted successfully");
                handlepost();
            }
            else{
                toast.error("Failed to delete post");
            }
        }
        else{
            return;
        }
    }
    useEffect(() => {
        handlepost()
    }, [])
    return (
        <>
            <div className='min-h-screen bg-white'>
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">All Posts</h1>
                    {posts?.map(post => (
                        <div>
                            <div key={post?._id} className="bg-white p-4 rounded-lg shadow-md mb-4 w-fit">
                                {
                                    post?.post?.includes("image") ? <img src={post?.post} width={120}></img> : <video src={post?.post} controls></video>

                                }
                                <h2 className="text-xl font-semibold mb-2">{post?.title}</h2>
                                <p className="text-gray-700 mb-4">{post?.Description}</p>
                                <div className="flex items-center space-x-4">
                                    <button className="flex items-center space-x-1 text-blue-500">
                                        <ThumbsUp className="w-5 h-5" />
                                        <span>Like</span>
                                    </button>
                                    <button className="flex items-center space-x-1 text-blue-500 border-4" onClick={()=>(handletoggle(post._id))}>
                                        <MessageSquare className="w-5 h-5" />
                                        <span>Comment</span>
                                    </button>
                                    <button onClick={()=>(confirmation(post?._id))}>
                                        <Trash className="w-5 h-5" />
                                    </button>
                                    {/* //<button onClick={()=>(handlepost(post._id))}>comment</button> */}
                                </div>
                            </div>
                            {commenttoggle && (
                                <div>
                                    <h1>No of Comment {nocomment}</h1>
                                    {
                                        allcomments?.length > 0 ? allcomments.map(comment => (
                                            <div key={comment?._id} className="border-t pt-2 mt-2">
                                              <p><strong>{comment?.friend[0].username}</strong>: {comment?.comment}</p>
                                            </div>
                                          ))
                                            : <p>No comments yet.</p>
                                    }
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )

}
