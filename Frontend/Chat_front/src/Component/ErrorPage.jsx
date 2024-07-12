import React from 'react';
import { useNavigate } from "react-router-dom";
export default function ErrorPage() {
    const navigate=useNavigate();
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-red-600 mb-4">Error</h1>
            <p className="text-lg text-gray-700 mb-6">Oops!!this page does not exist</p>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={()=>(navigate(-1))}
            >
                Go Back
            </button>
        </div>
    );
};


