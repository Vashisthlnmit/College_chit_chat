import express from "express"
import { createServer } from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser"
import { intializesocket } from "./Socket/index.js";
import cors from "cors"
const app=express()
const httpserver=createServer(app)
export const io=new Server(httpserver,{
    cors:{
        origin:"http://localhost:5173",
        credentials:true
    }
})
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"))
app.use(express.json())
app.use(cookieParser())

//Router
import { userrouter } from "./Router/UserRouter.js";
import { postrouter } from "./Router/PostRouter.js";
import { commentrouter } from "./Router/CommentRouter.js";
import { followrouter } from "./Router/FollowRouter.js";
import { ChatRouter } from "./Router/ChatRouter.js";
import { messagerouter } from "./Router/MessageRouter.js";
app.use("/api",userrouter);
app.use("/api/post",postrouter);
app.use('/api/comment',commentrouter);
app.use('/api/follow',followrouter);
app.use(`/api/chat`,ChatRouter);
app.use(`/api/message`,messagerouter);
intializesocket(io)
export {httpserver}