import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import toast from "react-hot-toast";
export const addpost=createAsyncThunk('/addpost',async(data)=>{
    console.log(data);
    const form=new FormData;
    form.append("title",data.title);
    form.append("Description",data.description);
    form.append("post",data.post);
    try{
     const response=axios.post('http://localhost:5600/api/post/addpost',form,{withCredentials:true})
     toast.promise(response,{
        loading:"wait while creating the post",
        success: "post added sucessfully",
        error:"failed to create post "
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
export const noofpostbyuser=createAsyncThunk('/noofpostbyuser',async(data)=>{
    console.log(data);
    try{
     const response=axios.get(`http://localhost:5600/api/post/noofpostbyuser/${data.id}`,{withCredentials:true})
     toast.promise(response,{
        loading:"wait fetching the no of post by you",
        success: "",
        error:"failed to fetch post no"
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
export const allpostbyuser=createAsyncThunk('/allpostbyuser',async(data)=>{
    try{
     const response=axios.get(`http://localhost:5600/api/post/allpostbyuser/${data.id}`,{withCredentials:true})
     toast.promise(response,{
        loading:"wait fetching all post ",
        success: "all post fetched successfully",
        error:"failed to fetch all the post"
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
export const deletepost=createAsyncThunk('/deletepost',async(data)=>{
    console.log(data);
    try{
     const response=axios.delete(`http://localhost:5600/api/post/deletepost/${data.postid}`,{withCredentials:true})
     toast.promise(response,{
        loading:"wait while deleting the post",
        success: "post deleted successfully",
        error:"failed to delete post"
     })
     const resp=await response;
     console.log(resp);
     return resp;
    }
    catch(err){
        console.log(err);
        //toast.error(err?.response?.data?.message)
    }
})
const postslice=createSlice({
    name:"poststuff",
    initialState:[],
    reducers:{},
})
export default postslice.reducer
