import { chatevent } from "../constant.js";
import cookieparser from "cookie-parser"
import { ApiError } from "../Response/apierror.js";
import cookie from "cookie"
import jwt from "jsonwebtoken"
import { Usermodel } from "../Models/Usermodel.js";
const mounttypingevent=(socket)=>{
    socket.on(chatevent.Typingevent,(chatid)=>{
        socket.to(chatid).emit(chatevent.Typingevent,chatid)
    })
}
const mountconnectedevent=(socket)=>{
    socket.on(chatevent.Connected,(chatid)=>{
        socket.to(chatid).emit(chatevent.Connected,chatid)
    })
}
const mountdisconnectevent=(socket)=>{
    socket.on(chatevent.Disconnected,(chatid)=>{
        socket.to(chatid).emit(chatevent.Disconnected,chatid)
    })
}
const mounterrorevent=(socket)=>{
    socket.on(chatevent.Errors,(chatid)=>{
        socket.to(chatid).emit(chatevent.Errors,chatid)
    })
}
export const intializesocket=(io)=>{
    io.on('connection',async(socket)=>{
        //console.log(socket);
        try{
            // console.log(socket.handshake.headers);s
            const allcookie= cookie.parse(socket.handshake.headers.cookie || "");
            const token=allcookie?.Accesstoken
            if(!token){
                throw new ApiError(400,"Unauthorized user token not found")
            }
            const decodetoken=jwt.verify(token,process.env.JWT_SECRET)
            const userinfo=await Usermodel.findById(decodetoken?._id);
            if(!userinfo){
                throw new ApiError(400,"unauthorized handshake")
            }
            socket.user=userinfo
            socket.join(userinfo?._id.toString());
            //socket.to(userinfo?._id.toString()).emit("hello sir")
            socket.emit(chatevent.Connected,userinfo?._id)       
            console.log("User is connected successfully");
            mountconnectedevent(socket);
            mounttypingevent(socket);
            socket.on('joinRoom', (roomId) => {
                socket.join(roomId);
                //console.log(`Socket joined room: ${roomId}`);
            });
            socket.on(chatevent.Disconnected,()=>{
                console.log("user is disconnected");
                if(userinfo?._id){
                    socket.leave(userinfo?._id.toString());
                }
            })
        }
        catch(err){
            console.log("some error in socket inintialization",);
            socket.emit(chatevent.Errors,err);
        }
    })
}
export const emitsocketevent=(io,roomid,event,payload)=>{
    console.log(event)
    const check=io.to(roomid.toString()).emit(event,payload)
    console.log(check)
}