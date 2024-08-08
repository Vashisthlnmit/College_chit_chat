import mongoose, { Schema, model } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const collegeEnum = [
    'Indian Institute of Technology, Bombay',
    'Indian Institute of Technology, Delhi',
    'Indian Institute of Technology, Kanpur',
    'Indian Institute of Technology, Madras',
    'Indian Institute of Technology, Kharagpur',
    'Indian Institute of Technology, Roorkee',
    'Indian Institute of Technology, Guwahati',
    'National Institute of Technology, Trichy',
    'National Institute of Technology, Surathkal',
    'National Institute of Technology, Warangal',
    'Birla Institute of Technology and Science, Pilani',
    'Anna University, Chennai',
    'Jawaharlal Nehru University, Delhi',
    'University of Delhi, Delhi',
    'Jadavpur University, Kolkata',
    'Banaras Hindu University, Varanasi',
    'University of Calcutta, Kolkata',
    'University of Mumbai, Mumbai',
    'University of Hyderabad, Hyderabad',
    'Amrita Vishwa Vidyapeetham, Coimbatore',
    'Manipal Academy of Higher Education, Manipal',
    'Vellore Institute of Technology, Vellore',
    'SRM Institute of Science and Technology, Chennai',
    'Indian Institute of Science, Bangalore',
    'Institute of Chemical Technology, Mumbai',
    'Jamia Millia Islamia, Delhi',
    'Savitribai Phule Pune University, Pune',
    'Symbiosis International University, Pune',
    'Tata Institute of Social Sciences, Mumbai',
    'Lovely Professional University, Phagwara'
];
const Userschema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    verifycode: {
        type: String,
    },
    verifycodeexpire: {
        type: Date,
    },
    isverified: {
        type: Boolean,
        default: false
    },
    forgotpasswordcode: {
        type: String,
    },
    forgotpasswordcodeexpire: {
        type: Date,
    },
    RefreshToken: {
        type: String
    },
    Bio: {
        type: String,
        required: true,
        default: "Hey there! I'm excited to connect with fellow students. Let's chat and make college life awesome together!"
    },
    College_Name: {
        type: String,
        required: true,
        enum: collegeEnum
    },
    Account_type: {
        type: String,
        required: true,
        enum: ["Public", "Private"]
    },
}, { timestamps: true });
Userschema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next();
}
)
Userschema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
};
Userschema.methods.generateaccesstoken=function(){
    const accesstoken= jwt.sign({
        _id:this._id,
        username:this.username,
        email:this.email,
        College_Name:this.College_Name,

    },process.env.JWT_SECRET,{expiresIn:process.env.JWT_CODEEXPIRY})
    return accesstoken;
};
Userschema.methods.generaterefreshtoken=function(){
    const refreshtoken= jwt.sign({
        _id:this._id,
        username:this.username,
        email:this.email,

    },process.env.JWT_SECRET,{expiresIn:process.env.JWT_CODEEXPIRY})
    return refreshtoken;
};
export const Usermodel = model("Usermodel", Userschema)