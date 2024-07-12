import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getallfollower } from "../store/Slice/Follower";
import toast from "react-hot-toast";
import { creategrp } from "../store/Slice/Chatslice";
export default function Creategrp() {
    const dispatch = useDispatch();
    const data = JSON.parse(localStorage.getItem("data"));
    const [group, setgroup] = useState({ name: "", paractipants: [] });
    const [follower, setfollower] = useState([])
    async function fetchallfollower() {
        const resp = await dispatch(getallfollower({id:data._id}))
        console.log(resp);
        console.log(resp?.payload?.data?.data);
        setfollower(resp?.payload?.data?.data)
    }
    async function creategroupchat() {
        if (!group.name || group.paractipants.length < 3) {
            toast.error("Please enter group name and select at least 3 participants");
            return;
        }
        const resp = await dispatch(creategrp(group))
        console.log(resp);
    }
    function addfriendinchat(friendid) {
        if (group.paractipants.includes(friendid)) {
            toast.error("this user already added in chat")
            return;
        }
        else {
            setgroup({ ...group, paractipants: [...group.paractipants, friendid] })
            toast.success("User added successfully")
            return;
        }
    }
    function removefriendfromchat(friendid) {
        if (!group.paractipants.includes(friendid)) {
            toast.error("your user already removed from group");
            return;
        }
        else {
            setgroup({ ...group, paractipants: group.paractipants.filter((indx) => indx != friendid) })
            toast.success("User removed successfully")
            return;
        }
    }
    useEffect(() => {
        fetchallfollower()
    }, [])
    return (
        <>
            <div className="min-h-screen bg-white">
                <h1 className="text-xl font-bold text-center text-black">Create Group chat</h1>
                {/* <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
                <h1 className="text-2xl font-bold mb-6">All your Follower</h1>
                {follower.length > 0 ? (
                    follower.map((followobj) => (
                        <div key={followobj._id} className="mb-4 p-4 border border-gray-200 rounded-md">
                            <div className='flex flex-wrap justify-between'>
                                <h1 className='font-bold text-xl'>{followobj.friends[0].username}</h1>
                                <h1 className='font-bold text-xl'>{followobj.friends[0].email}</h1>
                                <button onClick={() => (addfriendinchat(followobj.friends[0]._id))} className="btn btn-active btn-secondary">Add a friend in chat</button>
                                <button onClick={() => (removefriendfromchat(followobj.friends[0]._id))} className="btn btn-accent">Remove a friend from chat</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-700">No follower found</p>
                )}
            </div> */}
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4 text-center text-black">All Chats</h1>
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b text-black">Name of Follower</th>
                                <th className="py-2 px-4 border-b text-black">Email</th>
                                <th className="py-2 px-4 border-b text-black">Add Friend in grp</th>
                                <th className="py-2 px-4 border-b text-black">Remove Friend in grp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {follower?.map((followobj) => (
                                <tr key={group._id}>
                                    <td className="py-2 px-4 border-b">
                                        <h1 className="text-center font-bold text-black">
                                            {followobj.friends[0].username}
                                        </h1>
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <h1 className="text-center font-bold text-black">
                                            {followobj.friends[0].email}
                                        </h1>
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <div className="flex flex-row justify-center">
                                            <button onClick={() => (addfriendinchat(followobj.friends[0]._id))} className="btn btn-active btn-secondary">Add a friend in chat</button>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <div className="flex flex-row justify-center">
                                            <button onClick={() => (removefriendfromchat(followobj.friends[0]._id))} className="btn btn-accent">Remove a friend from chat</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex flex-row justify-center">
                    <input type="text" value={group.name} onChange={(e) => (setgroup({ ...group, name: e.target.value }))} placeholder="Your Group Name" className="input input-bordered w-full max-w-xs" /> 
                    <button onClick={creategroupchat} className="btn btn-primary w-full max-w-xs mt-10">Create Group Chat</button>
                </div>
            </div>
        </>
    )
}