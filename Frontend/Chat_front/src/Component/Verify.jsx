import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux"
import { Verify } from "../store/Slice/Authentication";
import { Loader2 } from "lucide-react";
export default function Verifypage() {
    const [data, setdata] = useState({ email: "", verifycode: "" });
    const [loading, setloading] = useState(false);
    const dispatch = useDispatch();
    async function handlesubmit() {
        setloading(true)
        const response = await dispatch(Verify(data))
        console.log(response);
        setloading(false)
    }
    return (
        <>
           <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-4">Verify Your Account</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={data.email}
                        onChange={(e) => setdata({...data,email:e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="otp">
                        OTP
                    </label>
                    <input
                        type="text"
                        id="otp"
                        value={data.verifycode}
                        onChange={(e) => setdata({...data,verifycode:e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                        required
                    />
                </div>
                <button
                    onClick={handlesubmit}
                    className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                >
                    Verify
                </button>
            
        </div>
    
        </>
    )
}