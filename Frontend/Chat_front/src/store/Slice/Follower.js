import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { withCookies } from "react-cookie";
import toast from "react-hot-toast";
export const sendrequest=createAsyncThunk('/sendfollow',async(data)=>{
    try{
     const response=axios.post(`http://localhost:5600/api/follow/sendfollow/${data}`,data,{withCredentials:true})
     toast.promise(response,{
        loading:"wait sending the follow request",
        success: (data)=>{
            toast(data.data.Message)
        },
        error:"you have already followed him"
     })
     const resp=await response;
     console.log(resp);
     return resp;
    }
    catch(err){
        console.log(err);
        toast.error(err?.response?.data?.message)
    }
})
export const Acceptrequest=createAsyncThunk('/acceptfollow',async(data)=>{
    console.log(data);
    try{
     const response=axios.post(`http://localhost:5600/api/follow/accept/${data}`,data,{withCredentials:true})
     toast.promise(response,{
        loading:"wait accepting the follow request",
        success: (data)=>{
            toast(data.data.Message)
        },
        error:"failed to accept the request"
     })
     const resp=await response;
     console.log(resp);
     return resp;
    }
    catch(err){
        console.log(err);
        toast.error(err?.response?.data?.message)
    }
})
export const unfollowrequest=createAsyncThunk('/unfollow',async(data)=>{
    console.log(data);
    try{
     const response=axios.post(`http://localhost:5600/api/follow/unfollow`,data)
     toast.promise(response,{
        loading:"wait sending the follow request",
        success: (data)=>{
            toast(data.data.Message)
        },
        error:"failed to send the request"
     })
     const resp=await response;
     console.log(resp);
     return resp;
    }
    catch(err){
        console.log(err);
        toast.error(err?.response?.data?.message)
    }
})
export const getallfollower=createAsyncThunk('/acceptfollow',async(data)=>{
    try{
     const response=axios.get(`http://localhost:5600/api/follow/follower/${data.id}`,{withCredentials:true})
     toast.promise(response,{
        loading:"wait getting all follower",
        success: (data)=>{
            toast(data.data.Message)
        },
        error:"failed to fetch follower"
     })
     const resp=await response;
     console.log(resp);
     return resp;
    }
    catch(err){
        console.log(err);
        toast.error(err?.response?.data?.message)
    }
})
export const getallfollowing=createAsyncThunk('/acceptfollow',async(data)=>{
    console.log(data);
    try{
     const response=axios.get(`http://localhost:5600/api/follow/following/${data.id}`,{withCredentials:true})
     toast.promise(response,{
        loading:"wait getting all following",
        success: (data)=>{
            toast(data.data.Message)
        },
        error:"failed to fetch following"
     })
     const resp=await response;
     console.log(resp);
     return resp;
    }
    catch(err){
        console.log(err);
        toast.error(err?.response?.data?.message)
    }
})
export const noofallfollower=createAsyncThunk('/nofollower',async(data)=>{
    try{
     const response=axios.get(`http://localhost:5600/api/follow/nofollow/${data.id}`,{withCredentials:true})
     toast.promise(response,{
        loading:"wait getting all following",
        success: (data)=>{
            toast(data.data.Message)
        },
        error:"failed to fetch following"
     })
     const resp=await response;
     console.log(resp);
     return resp;
    }
    catch(err){
        console.log(err);
        toast.error(err?.response?.data?.message)
    }
})
export const noofallfollowing=createAsyncThunk('/nofollower',async(data)=>{
    try{
     const response=axios.get(`http://localhost:5600/api/follow/noffolowing/${data.id}`,{withCredentials:true})
     toast.promise(response,{
        loading:"wait getting all following",
        success: (data)=>{
            toast(data.data.Message)
        },
        error:"failed to fetch following"
     })
     const resp=await response;
     console.log(resp);
     return resp;
    }
    catch(err){
        console.log(err);
        toast.error(err?.response?.data?.message)
    }
})
export const getallfollowrequest=createAsyncThunk('/getallfollowreq',async()=>{
    try{
     const response=axios.get(`http://localhost:5600/api/follow/getallfollowreq`,{withCredentials:true})
     toast.promise(response,{
        loading:"wait getting all pending request",
        success: (data)=>{
            toast(data.data.Message)
        },
        error:"failed to fetch following"
     })
     const resp=await response;
     console.log(resp);
     return resp;
    }
    catch(err){
        console.log(err);
        toast.error(err?.response?.data?.message)
    }
})


// const followerSlice=createSlice({
//     name:"follower",
//     initialState:allfollower,
//     reducers:{},
//     extraReducers:(builder)=>{
//         builder
//         .addCase(getallfollower.fulfilled,(state,action)=>{
//             allfollower=action.payload.data.data;
//         })
//     }
// })

//export default followerSlice.reducer
