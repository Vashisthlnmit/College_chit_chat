import React, { useState, useEffect } from "react";
import { rename } from "../store/Slice/Chatslice";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
export default function RenameChat() {
    const [newchatname, setNewchatname] = useState("");
    const [editedname,seteditedname]=useState("");
    const location = useLocation();
    const dispatch = useDispatch();
    async function pleaserename(){
        const resp=await dispatch(rename({chatid: location.state.chatid, newname: newchatname}));
        console.log(resp);
        seteditedname(editedname)
        setNewchatname("");
    }
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded shadow-md w-96">
                    <h1 className="text-2xl font-bold mb-4">Change Chat Name</h1>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newChatName">
                            New Chat Name
                        </label>
                        <input
                            type="text"
                            id="newChatName"
                            value={newchatname}
                            onChange={(e) => setNewchatname(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <button
                        onClick={pleaserename}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Change Name
                    </button>
                        <div className="mt-4 text-center">
                            <p className="text-gray-700">Current Chat Name:</p>
                            {editedname ? <p className="text-lg font-semibold">{editedname}</p> : <p className="text-lg font-semibold">{location.state.name}</p>}
                        </div>
                    
                </div>
            </div>
        </>
    )
}