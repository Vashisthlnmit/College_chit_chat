import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { getallmessage, addmessgae, deletemessage } from "../store/Slice/Messageslice";
import { Trash } from 'lucide-react';
export default function MessageArea() {
    const dispatch = useDispatch();
    const location = useLocation();
    const data = JSON.parse(localStorage.getItem("data"));
    const [message, setMessage] = useState([]);
    const [preview, setPreview] = useState("");
    const [sendmessage, setsendmessage] = useState({ content: "", attachment: "" });
    async function fetchMessages() {
        const resp = await dispatch(getallmessage({ chatid: location.state.chatid }));
        console.log(resp);
        setMessage(resp?.payload?.data?.data);
    }
    function filereader(e) {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            setsendmessage({ ...sendmessage, attachment: file });
            reader.readAsDataURL(file);
            reader.addEventListener("load", function () {
                setPreview(this.result);
            })
        }
    }
    async function addmessagetochat() {
        let resp;
        if (sendmessage?.attachment) {
            resp = await dispatch(addmessgae({ chatid: location.state.chatid, content: sendmessage.content, attachment: sendmessage.attachment }));
        }
        else {
            resp = await dispatch(addmessgae({ chatid: location.state.chatid, content: sendmessage.content }));
        }
        console.log(resp);
        //setMessage([...message, resp?.payload?.data?.data[0]]);
        fetchMessages()
        setsendmessage({ content: "", attachment: "" });  // Reset the message input after sending
        setPreview("");  // Clear the preview
    }
    async function removemessage(chatid, messageid) {
        const doubleconfirmation = window.confirm("are you sure you want to delete this message");
        if (doubleconfirmation) {
            const resp = await dispatch(deletemessage({ messageid: messageid, chatid: chatid }));
            console.log(resp);
            if (resp?.payload?.data?.success) {
                fetchMessages();
            }
        }
        else{
            return;
        }
    }
    useEffect(() => {
        fetchMessages();
    }, [])

    return (
        <>
            <div className="min-h-screen bg-white">
                <div className="p-4">
                    <h1>{location?.state.name}</h1>
                    {
                        message?.map((msg) => (
                            <div>
                                {
                                    data._id == msg?.sender[0]._id ? <div className="chat chat-start">
                                        <div className="chat-header">
                                            <h1>me</h1>
                                            <button onClick={()=>(removemessage(location.state.chatid,msg?._id))}><Trash /></button>
                                        </div>
                                        <div className="chat-bubble bg-accent text-white">{msg?.content}</div>
                                    </div> : <div className="chat chat-start">
                                        <div className="chat-header">
                                            {msg?.sender[0]?.username}
                                        </div>
                                        <div className="chat-bubble text-white">{msg?.content}</div>
                                    </div>
                                }
                                <div>
                                    {msg?.attachement && <div>
                                        {msg?.attachement?.includes("image") ? <img src={msg.attachement}></img> : <video src={msg.attachement} controls></video>}

                                    </div>}
                                </div>
                            </div>
                        ))
                    }
                    {/* <input
                        type="text"
                        placeholder="Enter your Message"
                        value={sendmessage.content}
                        onChange={(e) => (setsendmessage({ ...sendmessage, content: e.target.value }))}
                        className="input input-bordered input-primary w-full max-w-xs" /> */}
                    <label className="input input-bordered flex items-center gap-2">
                        <input type="text" className="grow" placeholder="Enter your Message" value={sendmessage.content}
                            onChange={(e) => (setsendmessage({ ...sendmessage, content: e.target.value }))} />
                        <button onClick={addmessagetochat}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-big-right"><path d="M6 9h6V5l7 7-7 7v-4H6V9z" /></svg>
                        </button>
                    </label>
                    <input
                        type="file"
                        className="file-input file-input-bordered file-input-primary w-full max-w-xs" onChange={filereader} />
                    {preview && <img src={preview} alt="preview" />}
                    {/* <button className="btn" onClick={addmessagetochat}>Submit</button> */}
                </div>
            </div>
        </>
    )
}