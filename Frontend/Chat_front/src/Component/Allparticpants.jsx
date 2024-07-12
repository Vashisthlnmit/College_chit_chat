import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { avaiuser, rename, Addparticipants, removeparticipants, delchat } from "../store/Slice/Chatslice";
export default function GroupInfo() {
    const dispatch = useDispatch();
    const location = useLocation();
    const [grpinfo, setgrpinfo] = useState([]);
    const navigate = useNavigate();
    const data = JSON.parse(localStorage.getItem("data"));
    console.log(data._id);
    async function groupinfo() {
        const response = await dispatch(avaiuser({ chatid: location.state.chatid }));
        console.log(response);
        setgrpinfo(response?.payload?.data?.data);
    }
    async function remove(userid) {
        const resp = await dispatch(removeparticipants({ chatid: location.state.chatid, userid: userid }));
        console.log(resp);
        groupinfo();
    }
    async function deletechat(chatid){
        const resp = await dispatch(delchat({ chatid: chatid }));
        console.log(resp);
        navigate('/allchat');
    }
    useEffect(() => {
        groupinfo();
    }, [])
    return (
        <>
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10">
                <div className="px-6 py-4">
                    <h2 className="text-2xl font-bold mb-2">{location.state.name}</h2>
                    {/* {
                        data._id === grpinfo[0]?.Admin && <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
                            <li>AddParticpants</li>
                            <li onClick={() => (navigate('/renamechat', { state: { chatid: grpinfo[0]?._id, name: grpinfo[0].name } }))}>Rename</li>
                        </ul>
                    } */}
                    {
                        data._id === grpinfo[0]?.Admin && <div className="flex flex-row justify-content-center">
                            <button className="btn no-animation" onClick={()=>navigate('',{state:{chatid:grpinfo[0]?._id,name:grpinfo[0].name }})}> AddParticpants</button>
                            <button className="btn no-animation" onClick={() => (navigate('/renamechat', { state: { chatid: grpinfo[0]?._id, name: grpinfo[0].name } }))}>Rename</button>
                            <button className="btn no-animation" onClick={()=>(deletechat(grpinfo[0]._id))}>Delete Chat</button>
                        </div>
                    }

                    <h3 className="text-xl font-semibold mb-2">Members:</h3>
                    {
                        data._id == grpinfo[0]?.Admin ? <div className="">
                            {grpinfo.map((member, index) => (
                                // <div className="flex flex-row justify-center m-2">
                                //     <h1 key={index}  className="text-gray-700 text-base" >{member.userdetails[0].username}</h1>
                                //     <button className="btn btn-outline btn-error" onClick={()=>(remove(member.userdetails[0]._id))} >Remove</button>
                                // </div>
                                member.userdetails[0]._id == grpinfo[0]?.Admin ? <div className="flex flex-row justify-center m-2">
                                    <h1 key={index} className="text-gray-700 text-base" >{member.userdetails[0].username}</h1>
                                    <button className="btn btn-success text-white">Admin</button>
                                </div> : <div className="flex flex-row justify-center m-2">
                                    <h1 key={index} className="text-gray-700 text-base" >{member.userdetails[0].username}</h1>
                                    <button className="btn btn-outline btn-error" onClick={() => (remove(member.userdetails[0]._id))} >Remove</button>
                                </div>
                            ))}
                        </div> : <div className="">
                            {grpinfo.map((member, index) => (

                                member?.userdetails[0]._id == grpinfo[0]?.Admin ? <div  className="flex flex-row justify-center m-2">
                                     <h1 key={index} className="text-gray-700 text-base" >{member.userdetails[0].username}</h1>
                                     <button className="btn btn-success text-white">Admin</button>
                                </div> : <div  className="flex flex-row justify-center m-2">
                                      <h1 key={index} className="text-gray-700 text-base" >{member.userdetails[0].username}</h1>
                                </div>
                            ))}
                        </div>
                    }
                </div>
            </div>
        </>
    )
}