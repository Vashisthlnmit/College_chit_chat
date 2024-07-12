import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
export const creategrp = createAsyncThunk('/creategrp', async (data) => {
    console.log(data);
    try {
        const response = axios.post('http://localhost:5600/api/chat/creategrpchat', data, { withCredentials: true })
        toast.promise(response, {
            loading: "please wait while creating group chat",
            success: (data)=>{
                toast(data.data.Message)
            },
            error: "there some error while creating grp chat"
        })
        const resp = await response;
        console.log(resp);
        return resp;
    }
    catch (err) {
        console.log(err);
        return err;
    }

})
export const createonetoone = createAsyncThunk('/createone', async (data) => {
    console.log(data);
    try {
        const response = axios.post('http://localhost:5600/api/chat/createonechat', data, { withCredentials: true })
        toast.promise(response, {
            loading: "please wait while creating one to one chat",
            success: (data)=>{
                toast(data.data.Message)
            },
            error: "there some error while creating one to one chat"
        })
        const resp=await response;
        console.log(resp);
        return resp;
    }
    catch (err) {
        console.log(err);
        return err;
    }
})
export const Addparticipants = createAsyncThunk('/addparticpate', (data) => {
    const response = axios.post('http://localhost:5600/api/chat/addparti', data, { withCredentials: true })
    toast.promise(response, {
        loading: "please wait while creating one to one chat",
        success: (data)=>{
            toast(data.data.Message)
        },
        error: "there some error while creating one to one chat"
    })
})
export const removeparticipants = createAsyncThunk('/removeparticpate', async (data) => {
    try {
        const response = axios.post('http://localhost:5600/api/chat/removeparti', data, { withCredentials: true })
        toast.promise(response, {
            loading: "please wait while creating one to one chat",
            success: (data)=>{
                toast(data.data.Message)
            },
            error: "there some error while creating one to one chat"
        })
    }
    catch (err) {
        console.log(err);
        return err;
    }
})
export const delchat = createAsyncThunk('/removeparticpate', async (data) => {
    try {
        const response = axios.delete(`http://localhost:5600/api/chat/delechat/${data.chatid}`,{withCredentials:true})
        toast.promise(response, {
            loading: "please wait while creating one to one chat",
            success: (data)=>{
                toast(data.data.Message)
            },
            error: "there some error while creating one to one chat"
        })
    }
    catch (err) {
        console.log(err);
        return err;
    }
})
export const rename = createAsyncThunk('/removeparticpate', async (data) => {
    try {
        const response = axios.patch('http://localhost:5600/api/chat/renamechat', data, { withCredentials: true })
        toast.promise(response, {
            loading: "please wait while creating one to one chat",
            success: (data)=>{
                toast(data.data.Message)
            },
            error: "there some error while creating one to one chat"
        })
        const resp=await response;
        return resp;
    }
    catch (err) {
        console.log(err);
        return err;
    }
})
export const avaiuser = createAsyncThunk('/removeparticpate', async (data) => {
    try {
        const response = axios.get(`http://localhost:5600/api/chat/avaiuser/${data.chatid}`,{ withCredentials: true })
        toast.promise(response, {
            loading: "please wait while creating one to one chat",
            success: (data)=>{
                toast(data.data.Message)
            },
            error: "there some error while creating one to one chat"
        })
        const resp=await response;
        return resp;
    }
    catch (err) {
        console.log(err);
        return err;
    }
})
export const getallchat = createAsyncThunk('/removeparticpate', async () => {
    try {
        const response = axios.get('http://localhost:5600/api/chat/getallchat', { withCredentials: true })
        toast.promise(response, {
            loading: "please wait while creating one to one chat",
            success: (data)=>{
                toast(data.data.Message)
            },
            error: "there some error while creating one to one chat"
        })
        const resp=await response;
        console.log(resp);
        return resp;
    }
    catch (err) {
        console.log(err);
        return err;
    }
})
export const leavechatgroup = createAsyncThunk('/removeparticpate', async (data) => {
    try {
        const response = axios.post('http://localhost:5600/api/chat/leave', data, { withCredentials: true })
        toast.promise(response, {
            loading: "please wait while creating one to one chat",
            success: (data)=>{
                toast(data.data.Message)
            },
            error: "there some error while leaving group"
        })
        const resp=await response;
        console.log(resp);
        return resp;
    }
    catch (err) {
        console.log(err);
        return err;
    }
})
// const chatSlice = createSlice({
//     name:"Chatoption",
//     initialState:[],
//     reducers:{},
//     extraReducers
// })