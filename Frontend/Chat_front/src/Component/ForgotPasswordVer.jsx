import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { forgotpasswordverification } from '../store/Slice/Authentication';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
export default function PasswordChange(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [data,setdata]=useState({email:"",code:"",newPassword:""})
    async function handleSubmit(){
        const resp=await dispatch(forgotpasswordverification(data));
        console.log(resp);
        if(resp?.payload?.data.success){
            navigate('/signin');
        }
        else{
            toast.error("some error in changing the password")
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Change Password</h2>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={data.email}
                            onChange={(e) => setdata({...data,email:e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="code" className="block text-gray-700 text-sm font-bold mb-2">
                            Code
                        </label>
                        <input
                            type="text"
                            id="code"
                            value={data.code}
                            onChange={(e) => setdata({...data,code:e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="newPassword" className="block text-gray-700 text-sm font-bold mb-2">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            value={data.newPassword}
                            onChange={(e) => setdata({...data,newPassword:e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <button
                        
                        className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={handleSubmit}
                    >
                        Verify and Change
                    </button>
            </div>
        </div>
    );
};
