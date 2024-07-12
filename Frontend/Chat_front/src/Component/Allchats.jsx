import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { getallchat, leavechatgroup } from "../store/Slice/Chatslice";
import { useNavigate } from "react-router-dom";
export default function Chat() {
    const dispatch = useDispatch();
    const [chat, setchat] = useState([]);
    const data = JSON.parse(localStorage.getItem("data"));
    const navigate = useNavigate();
    async function fetchallchat() {
        const resp = await dispatch(getallchat());
        console.log(resp);
        setchat(resp.payload.data.data)
    }
    async function leavechat(chatid) {
        const resp = await dispatch(leavechatgroup({ chatid: chatid,userid:data._id}));
        console.log(resp);
        fetchallchat();
    }
    useEffect(() => {
        fetchallchat()
    }, [])
    return (
        <>

            <div className="min-h-screen bg-white">
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4 text-center text-black">All Chats</h1>
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b text-black">Name of Chat</th>
                                <th className="py-2 px-4 border-b text-black">Is Group Chat</th>
                                <th className="py-2 px-4 border-b text-black">Group Info</th>
                                <th className="py-2 px-4 border-b text-black">Leave Group</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chat?.map((group) => (
                                <tr key={group._id}>
                                    <td className="py-2 px-4 border-b">
                                        <div className="flex flex-row justify-center">
                                            <button className="btn btn-outline btn-warning" onClick={() => (navigate('/messagearea', { state: { chatid: group._id } }))}>{group?.name}</button>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <div className="flex flex-row justify-center">
                                            {group?.isgroup_chat ? <button className="btn btn-info text-white">
                                                Group Chat
                                            </button> : <button className="btn btn-info text-white">One to One chat</button>}
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <div className="flex flex-row justify-center">
                                            <button className="btn btn-outline btn-accent" onClick={() => (navigate('/allpart', { state: { chatid: group._id, name: group.name } }))}>Accent</button>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <div className="flex flex-row justify-center">
                                            <button className="btn btn-outline btn-error" onClick={() => (leavechat(group._id))}>Leave</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
