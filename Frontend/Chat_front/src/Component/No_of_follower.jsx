import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import { noofallfollower, noofallfollowing } from "../store/Slice/Follower";
import { noofpostbyuser } from "../store/Slice/Poststuff";
export default function No_follower({userid}) {
    const [follower, setfollower] = useState(0)
    const [following, setfollowing] = useState(0)
    const [nopost,setnopost]=useState(0);
    const dispatch = useDispatch()
    async function numfollower() {
        const resp = await dispatch(noofallfollower({id:userid}))
        console.log(resp);
        return resp;
        //console.log(resp?.payload?.data?.data[0].follower_count);
        //setfollower(resp?.payload?.data?.data[0].follower_count)
        //const aresp = await dispatch(noofallfollowing({id:userid}))
    }
    async function numfollowing(){
        const resp=await dispatch(noofallfollowing({id:userid}))
        console.log(resp);
        //setfollowing(aresp?.payload?.data?.data[0].following_count)
        return resp;
    }
    async function noofpost(){
        const resp=await dispatch(noofpostbyuser({id:userid}))
        console.log(resp);
        return resp;
    }
    async function inonegoallpromise(){
        try{
            const [followerdata,followingdata,postdata]=await Promise.all([numfollower(),numfollowing(),noofpost()])
            setfollower(followerdata?.payload?.data?.data[0].follower_count)
            setfollowing(followingdata?.payload?.data?.data[0].following_count)
            if(postdata?.payload?.data?.data.length>0){
                setnopost(postdata?.payload?.data?.data[0].post_count);
            }
        }
        catch(e){
            console.log(e);
        }
    }
    useEffect(() => {
        inonegoallpromise()
    }, [])
    return (
        <>
            {/* <h1>No of follower:{follower}</h1>
          <h1>No of following:{following}</h1> */}
            <div className="flex flex-row">
                <div className="flex flex-col items-center justify-center m-4">
                    <div className="text-2xl font-bold text-blue-600">{follower}</div>
                    <div className="text-xl text-gray-700 mt-2">No of follower</div>
                </div>
                <div className="flex flex-col items-center justify-center m-4">
                    <div className="text-2xl font-bold text-blue-600">{following}</div>
                    <div className="text-xl text-gray-700 mt-2">No of following</div>
                </div>
                <div className="flex flex-col items-center justify-center m-4">
                    <div className="text-2xl font-bold text-blue-600">{nopost}</div>
                    <div className="text-xl text-gray-700 mt-2">No of Post</div>
                </div>

            </div>
        </>
    )
}