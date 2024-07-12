import mongoose,{Schema,model} from "mongoose";
const messagechema=new Schema({
    sender:{
        type:mongoose.Types.ObjectId,
        ref:"Usermodel"
    },
    content:{
        type:String,
    },
    attachement:{
        type:String,
    },
    chat:{
        type:Schema.Types.ObjectId,
        ref:"chatmodel"
    }
},{timestamps:true})
export const messagemodel=model("messagemodel",messagechema)