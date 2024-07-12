import React from "react";
import No_follower from "./No_of_follower";
import Allfollower from "./Allfollower";
import Allfollowing from "./Allfollowing";
import { useNavigate } from "react-router";
import { changeaccount } from "../store/Slice/Authentication";
import { useDispatch } from "react-redux";
export default function UserProfile() {
  const dispatch = useDispatch();
  const data = JSON.parse(localStorage.getItem("data"));
  console.log(data);
  async function handleaccounttype(e) {
    const type = e.target.value;
    if (data.Account_type == type) {
      console.log("hello");
      return;
    }
    const resp = await dispatch(changeaccount({ Account_type: type }))
    console.log(resp);
    if (resp?.payload?.data?.success) {
      data.Account_type = type;
      localStorage.setItem("data", JSON.stringify(data));
    }
  }
  const navigate = useNavigate()
  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="flex flex-row justify-center ">
          <div className="avatar placeholder m-4">
            <div className="bg-accent text-neutral-content w-24 rounded-full">
              <span className="text-3xl text-white">{data.username.charAt(0).toUpperCase()}</span>
            </div>
          </div>
          <div className="m-4">
            <h1 className="font-bold text-black">{data.username}</h1>
            <h1 className="font-bold text-black">{data.email}</h1>
            <h1 className="font-bold text-black">{data.College_Name}</h1>
            <h1 className="font-bold text-black">{data.Bio}</h1>
            {/* <h1 className="font-bold text-black">{}</h1> */}
          </div>
          <div className="m-4">
            <No_follower userid={data._id} />
          </div>
        </div>
        <button className="btn btn-success" onClick={() => (navigate('/allpost', { state: { userid: data._id } }))}>View your post</button>
        <div className="p-4 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 text-center">Change Account Type</h2>
          <div className="flex flex-row items-center justify-content-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="accountType"
                value="Public"
                checked={data.Account_type == 'Public'}
                onClick={handleaccounttype}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2">Public</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="accountType"
                value="Private"
                checked={data.Account_type == 'Private'}
                onClick={handleaccounttype}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2">Private</span>
            </label>
          </div>
        </div>
        <div className="flex flex-row justify-content-evenly">
          <Allfollower userid={data._id} />
          <Allfollowing userid={data._id} />
        </div>
      </div>
    </>
  )
}