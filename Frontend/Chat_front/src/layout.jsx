import React, { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { Outlet, useNavigate } from "react-router";
import socket from "./sockets/socket";
import { chatevent } from "./sockets/socket";
import Header from "./Component/Header";
export default function Layout() {
  const data = JSON.parse(localStorage.getItem("data"));
  const navigate = useNavigate();
  // socket.emit('connection', () => {
  //   console.log("socket is connected successfully");
  // })
  // socket.on(chatevent.Connected, (data) => {
  //   socket.join(data)
  // })
  // socket.on(chatevent.Sendrequest, () => {
  //   console.log("yep");
  // })
  // const data = JSON.parse(localStorage.getItem("data"));
  //   console.log(data);
  useEffect(() => {
    socket.emit(`connection`, () => {
      console.log("socket is connected successfully");
    })
    socket.on(chatevent.Connected, () => {
      //console.log(p);
      // if(!p){
      //   localStorage.removeItem("data");
      //   localStorage.removeItem("isloggedin");
      //   navigate('/signin');
      //   return;
      // }
      const data = JSON.parse(localStorage.getItem('data'));
      if (data && data._id) {
        console.log('Joining room:', data._id);
        socket.emit('joinRoom', data._id);
      }
    })
    socket.on(chatevent.Errors, (data) => {
      console.log(data);
      if (!data?.success) {
        localStorage.removeItem("data");
        localStorage.removeItem("isloggedin");
        navigate('/signin');
      }
    })
    socket.on(chatevent.Acceptrequest, (data) => {
      console.log("hello world");
      console.log(data);
      toast("hello you are accept request", {
        duration: 4000,
      })
    })
    socket.on(chatevent.Sendrequest, (data) => {
      console.log(data);
      toast("send request send successfully", {
        duration: 4000,
      })
    })
    socket.on(chatevent.RECEIVEDrequest, (data) => {
      console.log(data);
      toast("you have a message from chat", {
        duration: 4000,
      })
    })
    socket.on(chatevent.Deletedmesage, (data) => {
      console.log(data);
      toast("message is deleted", {
        duration: 4000,
      })
    })
    socket.on(chatevent.Commented, (data) => {
      console.log(data);
      toast("someone has commented", {
        duration: 4000,
      })
    })
    socket.on(chatevent.Liked, (data) => {
      console.log(data);
      toast("someone has liked", {
        duration: 4000,
      })
    })
    socket.on(chatevent.Created, (data) => {
      console.log(data);
      toast("someone has created group", {
        duration: 4000,
      })
    })
    socket.on(chatevent.Joined, (data) => {
      console.log(data);
      toast("someone has joined", {
        duration: 4000,
      })
    })
    socket.on(chatevent.Removed, (data) => {
      console.log(data);
      toast("someone has removed", {
        duration: 4000,
      })
    })
    socket.on(chatevent.Updated, (data) => {
      console.log(data);
      toast("someone has updated", {
        duration: 4000,
      })
    })
    socket.on(chatevent.Left, (data) => {
      console.log(data);
      toast("someone has commented left", {
        duration: 4000,
      })
    })


  }, [])
  return (
    <>
      <Header />
      <Outlet />
      <Toaster />
    </>
  )
}