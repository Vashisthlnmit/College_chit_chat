import mongoose from "mongoose";
export async function Dbconnection(){

    try{
        const connectionresponse=await mongoose.connect(`${process.env.DB_CONNECTION_STRING}/${process.env.DB_NAME}`) 
        console.log("Database connection established. Ready for queries.",connectionresponse.connection.host)
        
    }
    catch(err){
        console.log(err);
        process.exit(1)
    }
}