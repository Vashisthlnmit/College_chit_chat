import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getallfollowing } from '../store/Slice/Follower';
export default function Allfollowing({userid}) {
    const data = JSON.parse(localStorage.getItem("data"));
    console.log(data);
    const dispatch = useDispatch()
    const [following, setfollowing] = useState([]);
    async function fetchallfollowing() {
        const resp = await dispatch(getallfollowing({id:userid}));
        console.log(resp);
        console.log(resp.payload.data.data);
        setfollowing(resp.payload.data.data)
    }
    useEffect(() => {
        fetchallfollowing()
    }, [])
    return(
        <>
          <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-200 rounded-md shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-black">All your Following</h1>
                {following.length > 0 ? (
                    following.map((followingobj) => (
                        <div key={followingobj._id} className="mb-4 p-4 border border-gray-200 rounded-md">
                            <div className='flex flex-row flex-wrap justify-between'>
                                <h1 className='font-bold text-xl text-black m-2'>{followingobj.friends[0]?.username}</h1>
                                <h1 className='font-bold text-xl text-black m-2'>{followingobj.friends[0]?.email}</h1>
                                {userid==data._id &&  <button className="btn btn-primary m-2">Remove</button>}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-700">No following found</p>
                )}
            </div>
        </>
    )
}