import mongoose,{Schema,model} from "mongoose";
const chatschema=new Schema({
    name:{
        type:String,
        required:true
    },
    isgroup_chat:{
        type:Boolean,
        required:true
    },
    lastMessage:{
        type:Schema.Types.ObjectId,
        ref:"messagemodel"
    },
    participants:[
        {
            type:Schema.Types.ObjectId,
            ref:"Usermodel"
        }
    ],
    Admin:{
        type:Schema.Types.ObjectId,
        ref:"Usermodel"
    }
},{timestamps:true})
export const chatmodel=model("chatmodel",chatschema)