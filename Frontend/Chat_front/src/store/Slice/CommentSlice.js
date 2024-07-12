import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import toast from "react-hot-toast"
export const addcomment=createAsyncThunk('/addcomment',async(data)=>{
    console.log(data);
    try{
     const response=axios.post('http://localhost:5600/api/comment/add',data,{withCredentials:true})
     toast.promise(response,{
        loading:"wait signing the account",
        success: (data)=>{
            toast(data.data.Message)
        },
        error:"failed to signin the account"
     })
     const resp=await response;
     return resp;
    }
    catch(err){
        console.log(err);
        toast.error(err?.response?.data?.message)
    }
})
export const allcommentonpost=createAsyncThunk('/allcomment',async(data)=>{
    console.log(data);
    try{
     const response=axios.get(`http://localhost:5600/api/comment/allcom/${data.postid}`,{withCredentials:true})
     toast.promise(response,{
        loading:"wait while fetching all the comment",
        success: (data)=>{
            toast(data.data.Message)
        },
        error:"failed to signin the account"
     })
     const resp=await response;
     return resp;
    }
    catch(err){
        console.log(err);
        toast.error(err?.response?.data?.message)
    }
})
export const deletecomment=createAsyncThunk('/deletecomment',async(data)=>{
    console.log(data);
    try{
     const response=axios.delete(`http://localhost:5600/api/comment/del/${data.postid }`,data,{withCredentials:true})
     toast.promise(response,{
        loading:"wait while deleting the account",
        success: (data)=>{
            toast(data.data.Message)
        },
        error:"failed to signin the account"
     })
     const resp=await response;
     return resp;
    }
    catch(err){
        console.log(err);
        toast.error(err?.response?.data?.message)
    }
})
export const nocommentonpost=createAsyncThunk('/nocomment',async(data)=>{
    console.log(data);
    try{
     const response=axios.get(`http://localhost:5600/api/comment/nocom/${data.postid}`,data,{withCredentials:true})
     toast.promise(response,{
        loading:"wait while fetching the no of comment",
        success: (data)=>{
            toast(data.data.Message)
        },
        error:"failed to signin the account"
     })
     const resp=await response;
     return resp;
    }
    catch(err){
        console.log(err);
        toast.error(err?.response?.data?.message)
    }
})
