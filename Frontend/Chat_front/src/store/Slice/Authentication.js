import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import toast from "react-hot-toast"
const intialstate={
    isloggedin:localStorage.getItem("isloggedin") || false,
    data:localStorage.getItem("data") || {}
}
export const createaccount=createAsyncThunk('/signup',async(data)=>{
    console.log(data);
    try{
     const response=axios.post('http://localhost:5600/api/signup',data,{withCredentials:true})
     toast.promise(response,{
        loading:"wait creating the account",
        success: "your account has created successfully otp send on your email please verify it",
        error:"failed to create account"
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
export const authin=createAsyncThunk('/signin',async(data)=>{
    console.log(data);
    try{
     const response=axios.post('http://localhost:5600/api/signin',data,{withCredentials:true})
     toast.promise(response,{
        loading:"wait signing the account",
        success: "user signed successfully",
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
export  const Verify=createAsyncThunk('/verify',async(data)=>{
    try{
     const response=axios.post('http://localhost:5600/api/verify',data,{withCredentials:true})
     toast.promise(response,{
        loading:"wait while verify  the account",
        success: "account verified successfully",
        error:"failed to verify the account"
     })
     const resp=await response;
     return resp;
    }
    catch(err){
        console.log(err);
        toast.error(err?.response?.data?.message)
    }
})
export const Logout=createAsyncThunk('/logout',async(data)=>{
    try{
     const response=axios.post('http://localhost:5600/api/Logout',data,{withCredentials:true})
     toast.promise(response,{
        loading:"wait loging out ",
        success: "user logout successfully",
        error:"failed to logout the account"
     })
     const resp=await response;
     return resp;
    }
    catch(err){
        console.log(err);
        toast.error(err?.response?.data?.message)
    }
})
export const changeaccount=createAsyncThunk('/acc',async(data)=>{
    //console.log(data);
    try{
     const response=axios.post('http://localhost:5600/api/Changeacc',data,{withCredentials:true})
     toast.promise(response,{
        loading:"wait changing account ",
        success: "account type changed successfully",
        error:"failed to update account type"
     })
     const resp=await response;
     return resp;
    }
    catch(err){
        console.log(err);
        toast.error(err?.response?.data?.message)
    }
})
export const getuserinfo=createAsyncThunk('/acc',async(data)=>{
    try{
     const response=axios.get(`http://localhost:5600/api/infouser/${data.id}`,{withCredentials:true})
     toast.promise(response,{
        loading:"wait changing account ",
        success: "",
        error:"failed to update account type"
     })
     const resp=await response;
     return resp;
    }
    catch(err){
        console.log(err);
        toast.error(err?.response?.data?.message)
    }
})
export const searchbar=createAsyncThunk('/searc',async(data)=>{
    console.log(data);
    try{
        const response=axios.post('http://localhost:5600/api/search',data)
        toast.promise(response,{
           loading:"wait loading accounts ",
           success:"",
           error:"failed to update account type"
        })
        const resp=await response;
        return resp;
       }
       catch(err){
           console.log(err);
           toast.error(err?.response?.data?.message)
       }
})
export const forgotpassword=createAsyncThunk('/forgotpass',async(data)=>{
    console.log(data);
    try{
        const response=axios.post('http://localhost:5600/api/forgotpass',data,{withCredentials:true})
        toast.promise(response,{
           loading:"wait sending the forgot password request  ",
           success:"your request has been sent ",
           error:"failed to send the request"
        })
        const resp=await response;
        return resp;
       }
       catch(err){
           console.log(err);
           toast.error(err?.response?.data?.message)
       }
})
export const forgotpasswordverification=createAsyncThunk('/forgotpassverification',async(data)=>{
    console.log(data);
    try{
        const response=axios.post('http://localhost:5600/api/forgotpassverify',data,{withCredentials:true})
        toast.promise(response,{
           loading:"wait for updating the password",
           success:"your password is updated successfully ",
           error:"failed to update password"
        })
        const resp=await response;
        return resp;
       }
       catch(err){
           console.log(err);
           toast.error(err?.response?.data?.message)
       }
})
export const randompostonmainpage=createAsyncThunk('/random',async()=>{
    //console.log(data);
    try{
        const response=axios.get('http://localhost:5600/api/post/allpost',{withCredentials:true})
        toast.promise(response,{
           loading:"wait for getting the post",
           success:"",
           error:""
        })
        const resp=await response;
        return resp;
       }
       catch(err){
           console.log(err);
           toast.error(err?.response?.data?.message)
       }
})
const authoptions=createSlice({
    name:"auth",
    initialState:intialstate,
    extraReducers:(builder)=>{
        builder
        .addCase(authin.fulfilled,(state,action)=>{
            localStorage.setItem("isloggedin",action.payload.data.success)
            localStorage.setItem("data",JSON.stringify(action.payload.data.data))
            state.isloggedin=true
            state.data=action.payload.data.data
        })
        .addCase(forgotpasswordverification.fulfilled,(state,action)=>{
            localStorage.setItem("data",JSON.stringify(action.payload.data.data))
            state.isloggedin=true
            state.data=action.payload.data.data
        })
        .addCase(Logout.fulfilled,(state,action)=>{
            localStorage.removeItem("isloggedin")
            localStorage.removeItem("data")
            state.isloggedin=false
            state.data={}
        })

        
    }    
})
export  default authoptions.reducer