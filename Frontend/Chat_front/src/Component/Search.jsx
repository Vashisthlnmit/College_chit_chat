import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux"
import { searchbar } from "../store/Slice/Authentication";
import { sendrequest } from "../store/Slice/Follower";
import socket from "../sockets/socket";
import { chatevent } from "../sockets/socket";
import { useNavigate } from "react-router";
export default function Searchbar() {
    const localid = JSON.parse(localStorage.getItem("data"))._id
    const [data, setdata] = useState({ pattern: "" });
    const [userdata, setuserdata] = useState([])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    async function handlesubmit(e) {
        e.preventDefault();
        const response = await dispatch(searchbar(data));
        console.log(response.payload.data.data);
        setuserdata(response.payload.data.data)
    }
    async function friendreq(friendid) {
        const resp = await dispatch(sendrequest(friendid))
        console.log(resp);
    }
    return (
        <>
            <div className="min-h-screen bg-white">
                <div className="bg-white">
                    <div className="w-full md:w-1/3 my-auto mx-auto p-4">
                        <form onSubmit={handlesubmit}>
                            <label className="input input-bordered flex items-center gap-2 ">
                                <input type="text" className="grow" placeholder="Enter the name to search " value={data.pattern} onChange={(e) => setdata({ ...data, pattern: e.target.value })} />
                                <button type="submit">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4 opacity-70">
                                        <path
                                            fillRule="evenodd"
                                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                            clipRule="evenodd" />
                                    </svg>
                                </button>

                            </label>
                        </form>
                    </div>

                    <div className="container mx-auto my-8">
                        <table className="min-w-full border-collapse block md:table">
                            <thead className="block md:table-header-group">
                                <tr className="border border-gray-300 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
                                    <th className="bg-gray-200 p-2 text-gray-600 font-bold md:border md:border-gray-300 block md:table-cell">Name</th>
                                    <th className="bg-gray-200 p-2 text-gray-600 font-bold md:border md:border-gray-300 block md:table-cell">Email</th>
                                    <th className="bg-gray-200 p-2 text-gray-600 font-bold md:border md:border-gray-300 block md:table-cell">Follow</th>
                                </tr>
                            </thead>
                            <tbody className="block md:table-row-group">
                                {userdata.length > 0 ? (userdata.map((item) => (
                                    <tr key={item._id} className="bg-white border border-gray-300 md:border-none block md:table-row">
                                        <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">
                                            <button onClick={() => (navigate('/profile', { state: { userid: item._id, name: item.username } }))}>
                                                {item.username}
                                            </button>
                                        </td>
                                        <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">{item.email}</td>
                                        <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">
                                            <button className="bg-white border-2 border-blue-500  hover:bg-blue-700 text-blue-500 hover:text-white font-bold py-1 px-2 rounded w-full" onClick={() => friendreq(item._id)}>
                                                Follow
                                            </button>
                                        </td>
                                    </tr>
                                ))) : (<h1>Search for user</h1>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

