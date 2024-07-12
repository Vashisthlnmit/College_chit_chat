import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { FiUserPlus } from "react-icons/fi";
import { getallfollowrequest, Acceptrequest } from '../store/Slice/Follower';
import socket from "../sockets/socket";
import { chatevent } from "../sockets/socket";
export default function Allfollowreq() {
    const data = JSON.parse(localStorage.getItem("data"));
    console.log(data);
    const dispatch = useDispatch()
    const [arrofreq, setfollowreq] = useState([])
    async function accept(followrequestid) {
        const resp = await dispatch(Acceptrequest(followrequestid))
        console.log(resp)
    }
    async function followreq() {
        const resp = await dispatch(getallfollowrequest())
        console.log(resp);
        setfollowreq(resp.payload.data.data)
    }
    useEffect(() => {
        followreq()
    }, [])
    return (
        <>
            <h1 className="font-bold text-2xl">Follow request</h1>
            <div className="flex flex-wrap flex-row justify-center">
                <FiUserPlus size={200} />
            </div>
            {arrofreq.length > 0 ? (
                arrofreq.map((obj) => (
                    <div className="flex flex-wrap flex-row justify-center">
                        <h1>{obj.sender[0].username}</h1>
                        <button className="btn btn-outline btn-info" onClick={() => (accept(obj._id))}>Accept</button>
                    </div>
                ))
            ) : (
                <h1 className="font-bold text-xl">No all request available till now</h1>
            )}
        </>
    )
}