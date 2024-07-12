import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getallfollower } from '../store/Slice/Follower';
export default function Allfollower({ userid }) {
    const dispatch = useDispatch()
    const data = JSON.parse(localStorage.getItem("data"));
    console.log(data);
    const [follower, setfollower] = useState([])
    async function fetchallfollower() {
        const resp = await dispatch(getallfollower({ id: userid }))
        console.log(resp);
        console.log(resp.payload.data.data);
        setfollower(resp.payload.data.data)
    }
    useEffect(() => {
        fetchallfollower()
    }, [])
    return (
        <>
            <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-200 rounded-md shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-black">All your Follower</h1>
                {follower.length > 0 ? (
                    follower.map((followobj) => (
                        <div key={followobj._id} className="mb-4 p-4 border border-gray-200 rounded-md">
                            <div className='flex flex-row flex-wrap justify-between'>
                                <h1 className='font-bold text-xl text-black m-2'>{followobj.friends[0].username}</h1>
                                <h1 className='font-bold text-xl text-black m-2'>{followobj.friends[0].email}</h1>
                                {userid==data._id &&  <button className="btn btn-primary m-2">Remove</button>}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-black">No follower found</p>
                )}
            </div>
        </>
    )
}