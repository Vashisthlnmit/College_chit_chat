import React, { useState, useEffect } from "react";
import No_follower from "./No_of_follower";
import Allfollower from "./Allfollower";
import Allfollowing from "./Allfollowing";
import { useLocation, useNavigate } from "react-router";
import { getuserinfo } from "../store/Slice/Authentication";
import { useDispatch } from "react-redux";
export default function SearchProfile() {
    const [data, setdata] = useState({});
    const navigate=useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    async function handleuserdetail() {
        const resp = await dispatch(getuserinfo({ id: location.state.userid }))
        console.log(resp);
        if (resp?.payload?.data) {
            setdata(resp?.payload?.data?.data);
        }
    }
    useEffect(() => {
        handleuserdetail()
    }, [])
    return (
        <>
            {/* <h1>Name :{location.state.name}</h1>
        <No_follower userid={location.state.userid}/>
        <Allfollower userid={location.state.userid}/>
        <Allfollowing userid={location.state.userid}/> */}
            <div className="min-h-screen bg-white">
                <div className="flex flex-row justify-center ">
                    <div className="avatar placeholder m-4">
                        <div className="bg-accent text-neutral-content w-24 rounded-full">
                            <span className="text-3xl text-white">{data?.username?.charAt(0)?.toUpperCase()}</span>
                        </div>
                    </div>
                    <div className="m-4">
                        <h1 className="font-bold text-black">{data?.username}</h1>
                        <h1 className="font-bold text-black">{data?.email}</h1>
                        <h1 className="font-bold text-black">{data?.College_Name}</h1>
                        <h1 className="font-bold text-black">{data?.Bio}</h1>
                    </div>
                    <div className="m-4">
                        <No_follower userid={location.state.userid} />
                    </div>
                </div>
                <div className="flex flex-row justify-content-center">
                    {data?.Account_type == "Private" && <button className="btn btn-wide mx-auto">Private</button>}
                    {data?.Account_type == "Public" && <button className="btn btn-wide mx-auto" onClick={()=>(navigate('/allpost',{state:{userid:data._id}}))}>Click to see Post</button>}
                </div>
                <div className="flex flex-row justify-content-evenly">
                    <Allfollower userid={location.state.userid} />
                    <Allfollowing userid={location.state.userid} />
                </div>
            </div>
        </>
    )
}