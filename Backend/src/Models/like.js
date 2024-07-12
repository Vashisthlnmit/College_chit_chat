import mongoose,{Schema,model} from "mongoose";
const likeschema=new Schema({
    Post:{
        type:Schema.Types.ObjectId,
        ref:"Postmodel"
    },
    likedby:{
        type:Schema.Types.ObjectId,
        ref:"Usermodel"
    }
},{timestamps:true})
export const likemodel=model("Commentmodel",likeschema)