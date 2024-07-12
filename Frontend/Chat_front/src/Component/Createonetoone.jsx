import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getallfollower } from "../store/Slice/Follower";
import { createonetoone } from "../store/Slice/Chatslice";
export default function OnetoOnechat() {
    const dispatch = useDispatch();
    const [follower, setfollower] = useState([])
    const [member,setmember]=useState({username:"",userid:"",name:""});
    async function fetchallfollower() {
        const resp = await dispatch(getallfollower())
        console.log(resp);
        console.log(resp.payload.data.data);
        setfollower(resp.payload.data.data)
    }
    async function Createonechat(){
        const resp=await dispatch(createonetoone({name:member.name,userid:member.userid}));
        console.log(resp);
        setmember({username:"",userid:"",name:""});
    }
    useEffect(() => {
        fetchallfollower()
    }, [])
    return (
        <>
            <h1 className="text-xl font-bold">Create One to One chat</h1>
            <input type="text" value={member.name} onChange={(e) => (setmember({...member,name:e.target.value}))} placeholder="Your Chat Name" className="input input-bordered w-full max-w-xs" />
            <input type="text" className="input input-bordered w-full max-w-xs" value={member.username}  />
            <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
                <h1 className="text-2xl font-bold mb-6">All your Follower</h1>
                {follower.length > 0 ? (
                    follower.map((followobj) => (
                        <div key={followobj._id} className="mb-4 p-4 border border-gray-200 rounded-md">
                            <div className='flex flex-wrap justify-between'>
                                <h1 className='font-bold text-xl'>{followobj.friends[0].username}</h1>
                                <h1 className='font-bold text-xl'>{followobj.friends[0].email}</h1>
                                <button onClick={() => (setmember({userid:followobj.friends[0]._id,username:followobj.friends[0].username}))} className="btn btn-active btn-secondary">Create one to one chat</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-700">No follower found</p>
                )}
            </div>
            <button onClick={Createonechat} className="btn btn-primary w-full max-w-xs mt-10">Create one to one chat</button>

        </>
    )
}