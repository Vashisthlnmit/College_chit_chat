import mongoose,{Schema,model} from "mongoose";
const followschema=new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref:"Usermodel",
    },
    friend:{
        type:Schema.Types.ObjectId,
        ref:"Usermodel",
    },
    isaccepted:{
        type:Boolean,
        default:false,
    }
})
export const Followmodel=model("Followmodel",followschema);