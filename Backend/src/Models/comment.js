import mongoose,{Schema,model} from "mongoose";
const commentschema=new Schema({
    comment:{
        type:String
    },
    Post:{
        type:Schema.Types.ObjectId,
        ref:"Postmodel"
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"Usermodel"
    }
},{timestamps:true})
export const Commentmodel=model("Commentmodel",commentschema)