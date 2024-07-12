import { httpserver } from "./app.js";
import { configDotenv } from "dotenv";
import { Dbconnection } from "./Helper/dbconnect.js";
configDotenv({
    path:"./.env"
})
// const startserver=()=>{
//     app.listen(process.env.PORT,()=>{
//         console.log("the server started successfully");
//     })
// }
// async function completestartwithconnection(){
//     await Dbconnection(),
//     startserver()
// }
// completestartwithconnection()
Dbconnection()
.then(()=>{
    httpserver.listen(process.env.PORT,()=>{
        console.log("the server started successfully");
    })
})
.catch((err)=>{
    console.log("Mongo DB failed");
})