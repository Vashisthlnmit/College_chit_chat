import React from "react";
import { AlignJustify } from "lucide-react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { Logout } from "../store/Slice/Authentication";
export default function Header() {
    const dispatch = useDispatch();
    const data = JSON.parse(localStorage.getItem("data"));
    console.log(data);
    const navigate = useNavigate();
    async function handlelogout() {
        const resp = await dispatch(Logout());
        console.log(resp);
        if (resp?.payload?.data?.success) {
            navigate('/signin');
        }
    }
    return (
        <>
            <div className="drawer z-10 bg-white">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
                        <AlignJustify />
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        {data==null ? <>
                         <li><button className="btn btn-info text-white m-2" onClick={() => (navigate('/signin'))}>Sign in</button> </li>
                         <li><button className="btn btn-info text-white m-2" onClick={() => (navigate('/signup'))}>Sign up</button></li>
                        </> : <>
                            <li><button className="btn btn-info text-white m-2" onClick={() => (navigate('/user'))}>Your Profile</button></li>
                            <li><button className="btn btn-info text-white m-2 " onClick={() => (navigate('/search'))}>Search</button></li>
                            <li><button className="btn btn-info text-white m-2 " onClick={() => navigate('/about')}>About Us</button></li>
                            <li><button className="btn btn-info text-white m-2 " onClick={() => (navigate('/allchat'))}>All Chats</button></li>
                            <li><button className="btn btn-info text-white m-2" onClick={() => (navigate('/addpost'))}>Add Post</button></li>
                            <li><button className="btn btn-error text-white m-2" onClick={() => (handlelogout())}>Logout</button></li>
                            <li><button className="btn btn-error text-white m-2" onClick={() => (navigate('/allreq'))}>All Follow Request</button></li>
                            </>}
                    </ul>
                </div>
            </div>
        </>
    )
}
