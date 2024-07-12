import React, { useState } from "react";
import { ArrowRight } from 'lucide-react'
import { Link } from "react-router-dom"
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux"
import { authin } from "../store/Slice/Authentication";
import { useNavigate } from "react-router-dom";
import { forgotpassword } from "../store/Slice/Authentication";
import toast from "react-hot-toast";
export default function Signin() {
  const navigate = useNavigate()
  const [data, setdata] = useState({ email: "", password: "" });
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  async function handlesubmit() {
    setloading(true)
    const response = await dispatch(authin(data))
    console.log(response);
    if (response.payload.data.success) {
      navigate('/')
    }
    setloading(false)
  }
  async function forgotlink() {
    if (data.email.length == 0) {
      toast.error("Please enter your email.")
      return;
    }
    else {
      const resp = await dispatch(forgotpassword({ email: data.email }));
      console.log(resp);
      if (resp?.payload?.data.success) {
        navigate('/forgotverification')
      }
      else {
        toast.error("some error in sending the email")
      }
    }
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
                  src="https://media.istockphoto.com/id/597959356/photo/female-teacher-addressing-university-students-in-a-classroom.jpg?s=612x612&w=0&k=20&c=SCXcpy72KRZUj7n60xnzaRAPYBhwP3YCbRl2uiBWIrA="
                  alt=""
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              <div className="relative">
                <div className="w-full max-w-xl xl:mx-auto xl:w-full xl:max-w-xl xl:pr-24">
                  <h3 className="text-4xl font-bold text-white">
                    Join the conversation on College Chit-Chat. Share your thoughts, make new friends, and stay connected with your classmates.
                  </h3>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
              <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign in</h2>
                <p className="mt-2 text-sm text-gray-600">
                  <Link to={"/signup"}>
                    Create a free account
                  </Link>
                </p>
                <div className="space-y-5">
                  <div>
                    <label htmlFor="" className="text-base font-medium text-gray-900">
                      {' '}
                      Email address{' '}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="email"
                        placeholder="Email"
                        value={data.email}
                        onChange={(e) => (setdata({ ...data, email: e.target.value }))}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="" className="text-base font-medium text-gray-900">
                        {' '}
                        Password{' '}
                      </label>
                      <button onClick={forgotlink} className="text-sm font-semibold text-black hover:underline">
                        Forgot password
                      </button>
                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="password"
                        placeholder="Password"
                        value={data.password}
                        onChange={(e) => (setdata({ ...data, password: e.target.value }))}
                      ></input>
                    </div>
                  </div>
                  <div>
                    {loading ? <Loader2 /> : <button
                      type="button"
                      className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                      onClick={handlesubmit}
                    >
                      Get started <ArrowRight className="ml-2" size={16} />
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