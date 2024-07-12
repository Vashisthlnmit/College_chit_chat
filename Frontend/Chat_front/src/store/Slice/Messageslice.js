import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
export const addmessgae=createAsyncThunk('/sendfollow',async(data)=>{
    console.log(data);
    let form=new FormData;
    form.append('chatid',data.chatid);
    form.append('content',data.content);
    if(data?.attachment){
        form.append('attachement',data.attachment);
    }
    try{
     const response=axios.post(`http://localhost:5600/api/message/addmess`,form,{withCredentials:true})
     toast.promise(response,{
        loading:"wait sending the message ",
        success:"messgae send successfully",
        error:"failed to send the message",
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
export const getallmessage=createAsyncThunk('/sendfollow',async(data)=>{
    console.log(data.chatid); 
    try{
     const response=axios.get(`http://localhost:5600/api/message/getallmess/${data.chatid}`,{withCredentials:true})
     toast.promise(response,{
        loading:"wait retrieve all the message ",
        success:"all messga retrieve successfully",
        error:"failed to retrieve all the message",
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
export const deletemessage=createAsyncThunk('/sendfollow',async(data)=>{
    try{
     const response=axios.delete(`http://localhost:5600/api/message/delemess/${data.messageid}/${data.chatid}`,{withCredentials:true})
     toast.promise(response,{
        loading:"wait deleting your message ",
        success:"message deleted successfully",
        error:"failed to delete message",
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
