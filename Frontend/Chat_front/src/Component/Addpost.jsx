import React, { useState } from "react";
import { useDispatch } from "react-redux"
import { addpost } from "../store/Slice/Poststuff";
export default function Addpost() {
    const dispatch = useDispatch()
    const [data, setdata] = useState({ title: "", description: "", post: "" })
    const [imagepreview, setPreview] = useState("")
    function handleImageupload(e) {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            console.log(file);
            const filereader = new FileReader();
            setdata({ ...data, post: file })
            filereader.readAsDataURL(file);
            filereader.addEventListener("load", function () {
                setPreview(this.result)
            })
        }
    }
    async function Submit() {
        const resp = await dispatch(addpost(data));
        console.log(resp);
    }
    return (
        <>
            <div className="min-h-screen bg-white">
                <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
                    <h1 className="text-xl font-bold mb-4">Add a Post</h1>
                    <div className="mb-4">
                        {imagepreview ? (<img src={imagepreview}></img>) : (
                            <div>hello</div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="title">
                            Add video/photo for your post
                        </label>
                        <input
                            type="file"
                            onChange={handleImageupload}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="title">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={data.title}
                            onChange={(e) => setdata({ ...data, title: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setdata({ ...data, description: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                            rows="5"
                            required
                        ></textarea>
                    </div>
                    <button
                        onClick={Submit}
                        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </>
    )
}