import React from "react";
import { ArrowRight } from 'lucide-react'
import { Link, useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux"
import { createaccount } from "../store/Slice/Authentication";
const collegeEnum = [
    'Indian Institute of Technology, Bombay',
    'Indian Institute of Technology, Delhi',
    'Indian Institute of Technology, Kanpur',
    'Indian Institute of Technology, Madras',
    'Indian Institute of Technology, Kharagpur',
    'Indian Institute of Technology, Roorkee',
    'Indian Institute of Technology, Guwahati',
    'National Institute of Technology, Trichy',
    'National Institute of Technology, Surathkal',
    'National Institute of Technology, Warangal',
    'Birla Institute of Technology and Science, Pilani',
    'Anna University, Chennai',
    'Jawaharlal Nehru University, Delhi',
    'University of Delhi, Delhi',
    'Jadavpur University, Kolkata',
    'Banaras Hindu University, Varanasi',
    'University of Calcutta, Kolkata',
    'University of Mumbai, Mumbai',
    'University of Hyderabad, Hyderabad',
    'Amrita Vishwa Vidyapeetham, Coimbatore',
    'Manipal Academy of Higher Education, Manipal',
    'Vellore Institute of Technology, Vellore',
    'SRM Institute of Science and Technology, Chennai',
    'Indian Institute of Science, Bangalore',
    'Institute of Chemical Technology, Mumbai',
    'Jamia Millia Islamia, Delhi',
    'Savitribai Phule Pune University, Pune',
    'Symbiosis International University, Pune',
    'Tata Institute of Social Sciences, Mumbai',
    'Lovely Professional University, Phagwara'
]
export default function Signup() {
    const navigate = useNavigate()
    const [data, setdata] = useState({ username: "", email: "", password: "", Bio: "", College_Name: "", Account_type: "Private" })
    const [loading, setloading] = useState(false)
    const Dispatch = useDispatch();
    async function handlesubmit() {
        setloading(true)
        console.log(data);
        const resp = await Dispatch(createaccount(data));
        console.log(resp.payload.data.success);
        if (resp?.payload?.data?.success) {
            navigate('/verify')
        }
        setloading(false)
    }
    return (
        <>
            <div className="min-h-screen bg-white">
                <section>
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="relative flex items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24">
                            <div className="absolute inset-0">
                                <img
                                    className="h-full w-full rounded-md object-cover object-top"
                                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt=""
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

                        </div>
                        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                                <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign up</h2>
                                <p className="mt-2 text-base text-gray-600">
                                    Already have an account?{' '}
                                    <Link className="font-medium text-black transition-all duration-200 hover:underline" to={'/signin'}>
                                        Sign in
                                    </Link>
                                </p>

                                <div className="space-y-5">
                                    <div>
                                        <label htmlFor="name" className="text-base font-medium text-gray-900">
                                            {' '}
                                            Full Name{' '}
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                type="text"
                                                placeholder="Full Name"
                                                id="name"
                                                value={data.username}
                                                onChange={(e) => (setdata({ ...data, username: e.target.value }))}
                                            ></input>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="text-base font-medium text-gray-900">
                                            {' '}
                                            Email address{' '}
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                type="email"
                                                placeholder="Email"
                                                id="email"
                                                value={data.email}
                                                onChange={(e) => (setdata({ ...data, email: e.target.value }))}
                                            ></input>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="password" className="text-base font-medium text-gray-900">
                                                {' '}
                                                Password{' '}
                                            </label>
                                        </div>
                                        <div className="mt-2">
                                            <input
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                type="password"
                                                placeholder="Password"
                                                id="password"
                                                value={data.password}
                                                onChange={(e) => (setdata({ ...data, password: e.target.value }))}
                                            ></input>
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="Accounttype" className="text-base font-medium text-gray-900">
                                                    {' '}
                                                    Accounttype{' '}
                                                </label>
                                            </div>
                                            <div className="mt-2">
                                                <select name="Accounttype" id="" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50" onChange={(e) => (setdata({ ...data, Account_type: e.target.value }))}>
                                                    <option value="Private">Private</option>
                                                    <option value="Public">Public</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="Bio" className="text-base font-medium text-gray-900">
                                                    {' '}
                                                    Bio{' '}
                                                </label>
                                            </div>
                                            <div className="mt-2">
                                                <textarea name="Bio" className="border-2 border-gray-900" id="" placeholder="Enter your bio" rows={4} cols={50} value={data.Bio}
                                                    onChange={(e) => (setdata({ ...data, Bio: e.target.value }))} >

                                                </textarea>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="Collegename" className="text-base font-medium text-gray-900">
                                                    {' '}
                                                    College{' '}
                                                </label>
                                            </div>
                                            <div className="mt-2">
                                                <select name="Collegename" id="" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50" onChange={(e) => (setdata({ ...data, College_Name: e.target.value }))}>
                                                    {collegeEnum.map((idx) => (

                                                        <option value={idx}>{idx}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        {loading ? <LoaderCircle /> : <button
                                            type="button"
                                            className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                            onClick={handlesubmit}
                                        >
                                            Create Account <ArrowRight className="ml-2" size={16} />
                                        </button>}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}