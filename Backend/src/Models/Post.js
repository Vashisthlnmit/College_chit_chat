import mongoose,{Schema,model} from "mongoose";
import { string } from "zod";
const postschema=new Schema({
    post:{
        type:String,
        required:true,
    },
    title:{
        type:String,
    },
    Description:{
        type:String,
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"Usermodel",
        required:true
    }
},{timestamps:true})
export const Postmodel=model("Postmodel",postschema)