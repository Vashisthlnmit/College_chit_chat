import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";
import { Addparticipants } from "../store/Slice/Chatslice";
import Allfollower from "./Allfollower";
export default function Addmember() {
    const location=useLocation();
    const data = JSON.parse(localStorage.getItem("data"));
    const dispatch = useDispatch();
    const [follower, setfollower] = useState([])
    async function addpart(userid) {
        const resp = await dispatch(Addparticipants({ chatid: location.state.chatid, userid: userid }));
        console.log(resp);
    }
    async function fetchallfollower() {
        const resp = await dispatch(getallfollower({ id: data._id }))
        console.log(resp);
        console.log(resp.payload.data.data);
        setfollower(resp.payload.data.data)
    }
    useEffect(() => {
        fetchallfollower()
    }, [])
    return (
        <>
            <div className="min-h-screen bg-white">
                <h1 className="font-bold text-center text-black">Add Member to {location.state.name}</h1>
            <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-200 rounded-md shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-black">All your Follower</h1>
                {follower.length > 0 ? (
                    follower.map((followobj) => (
                        <div key={followobj._id} className="mb-4 p-4 border border-gray-200 rounded-md">
                            <div className='flex flex-row flex-wrap justify-between'>
                                <h1 className='font-bold text-xl text-black m-2'>{followobj.friends[0].username}</h1>
                                <h1 className='font-bold text-xl text-black m-2'>{followobj.friends[0].email}</h1>
                                <button onClick={()=>(addpart(followobj?._id))} className="btn btn-outline btn-success">Add</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-black">No follower found</p>
                )}
            </div>
            </div>
        </>
    )
}