import { ApiError } from "../Response/apierror.js";
import { ApiResponse } from "../Response/apiresponse.js";
import { asynchandler } from "../Helper/asynchandler.js";
import { emailverificationmail } from "../Helper/mail.js";
import { forgotpasswordverificationmail } from "../Helper/mail.js";
import { Usermodel } from "../Models/Usermodel.js";
import { uploadfile } from "../Helper/cloudinary.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
export const Signup = asynchandler(async (req, res) => {
    const { username, email, password, Bio, College_Name, Account_type } = req.body;
    console.log(username, email, password, Bio, College_Name, Account_type);
    if (!username || !email || !password || !Bio || !College_Name || !Account_type) {
        throw new ApiError(400, "some fields are missing")
    }
    const finduser = await Usermodel.findOne({ email: email });
    if (finduser && finduser.isverified) {
        throw new ApiError(400, "user already exist");
    }
    const generatecode = Math.floor(Math.random() * 100000);
    const codexpire = new Date();
    codexpire.setHours(codexpire.getHours() + 1);
    const newUser = await Usermodel.create({
        username: username,
        email: email,
        password: password,
        Bio: Bio,
        College_Name: College_Name,
        verifycode: generatecode.toString(),
        verifycodeexpire: codexpire,
        Account_type: Account_type,
    })
    emailverificationmail(email, generatecode);
    return res.json(new ApiResponse(200, true, "user registered successfully verification code has been sent to your email"))

})
export const Signin = asynchandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, "some fields are missing");
    }
    const user = await Usermodel.findOne({ email: email });
    if (!user) {
        throw new ApiError(400, "no such user found");
    }
    if (user.isverified == false) {
        throw new ApiError(400, "user not verified");
    }
    const checkpass = await user.isPasswordCorrect(password)
    if (!checkpass) {
        throw new ApiError(400, "password is incorrect")
    }
    const accesstoken = user.generateaccesstoken();
    const refreshtoken = user.generaterefreshtoken();
    user.RefreshToken = refreshtoken;
    await user.save();
    const resp = await Usermodel.findById(user._id).select("-verifycode -isverified -verifycodeexpire -createdAt -updatedAt -RefreshToken -password ")
    const options = {
        httpOnly: true,
        secure: true,
    }
    return res
        .status(200)
        .cookie("Accesstoken", accesstoken, options)
        .cookie("Refreshtoken", refreshtoken, options)
        .json(new ApiResponse(200, true, "user signed in successfully", resp));
})
export const Verification = asynchandler(async (req, res) => {
    const { verifycode, email } = req.body;
    if (!verifycode || !email) {
        throw new ApiError(400, "some detail is missing")
    }
    const finduser = await Usermodel.findOne({ email });
    if (!finduser) {
        throw new ApiError(400, "no such user exist with this email");
    }
    if (finduser.verifycode == verifycode && finduser.verifycodeexpire > Date.now()) {
        finduser.isverified = true;
        await finduser.save();
        return res.json(new ApiResponse(200, true, "user verified successfully"));
    }
    else if (finduser.verifycode != verifycode) {
        throw new ApiError(400, "verification code is not correct");
    }
    else {
        throw new ApiError(400, "verification timeout");
    }
})
export const Forgotpassword = asynchandler(async (req, res) => {
    const { email } = req.body;
    const userinfo = await Usermodel.findOne({ email: email, isverified: true });
    if (!userinfo) {
        throw new ApiError(400, "no such user exist with this email");
    }
    const generatecode = Math.floor(Math.random() * 1000000)
    const expirydate = new Date();
    expirydate.setHours(expirydate.getHours() + 1);
    userinfo.forgotpasswordcode = generatecode.toString();
    userinfo.forgotpasswordcodeexpire = expirydate;
    await userinfo.save();
    forgotpasswordverificationmail(userinfo.email, generatecode);
    return res.json(new ApiResponse(200, true, "forgot password verification has been sent to your email"));
})
export const Forgotpasswordverification = asynchandler(async (req, res) => {
    const { email, code, newPassword } = req.body
    if (!email || !code || !newPassword) {
        throw new ApiError(400, "some fields are missing")
    }
    const userinfo = await Usermodel.findOne({ email: email });
    if (!userinfo) {
        throw new ApiError(400, "no user with this email does not exist")
    }
    if (userinfo.forgotpasswordcode == code && userinfo.forgotpasswordcodeexpire > Date.now()) {
        const pass = await bcrypt.hash(newPassword, 10);
        const checkandupdate = await Usermodel.findByIdAndUpdate(req.user._id, {
            $set: {
                password: pass,
                forgotpasswordcode: null,
                forgotpasswordcodeexpire: null
            }
        }, { new: true })
        if (!checkandupdate) {
            throw new ApiError(500, "some internal error while updating the password");
        }
        return res.json(new ApiResponse(200, true, "user password has been updated", checkandupdate));
    }
    else if (userinfo.forgotpasswordcode != code) {
        return new ApiError(400, "code you entered is wrong")
    }
    else {
        throw new ApiError(400, "verification time over")
    }
})
export const RefreshAccesstoken = asynchandler(async (req, res) => {
    const incomingrefreshtoken = req.cookie.Refreshtoken || req.body.RefreshToken
    if (!incomingrefreshtoken) {
        throw new ApiError(400, "no refresh token found");
    }
    const decodedtoken = jwt.verify(incomingrefreshtoken, process.env.JWT_SECRET);
    const user = await Usermodel.findById(decodedtoken?._id);
    if (!user) {
        throw new ApiError(400, "invalid refresh token");
    }
    if (user.RefreshToken !== incomingrefreshtoken) {
        throw new ApiError(401, "refresh token expired");
    }
    const accesstoken = await user.generateaccesstoken();
    const refreshtoken = await user.generaterefreshtoken();
    console.log(accesstoken);
    console.log(refreshtoken);
    user.RefreshToken = refreshtoken;
    await user.save();
    const options = {
        httpOnly: true,
        secure: true
    };
    return res.status(200).cookie("Accesstoken", accesstoken, options).cookie("Refreshtoken", refreshtoken, options).json(new ApiResponse(200, true, "user signed in successfully"));
})
export const Logout = asynchandler(async (req, res) => {
    const user = await Usermodel.findByIdAndUpdate(req.user?._id, {
        $unset: {
            RefreshToken: 1
        }
    }, { new: true });
    const options = {
        httpOnly: true,
        secure: true
    };
    return res.status(200).clearCookie("Accesstoken", options).clearCookie("Refreshtoken", options).json(new ApiResponse(200, true, "user log out successfully"));

})
export const getuserdetailbyuser = asynchandler(async (req, res) => {
    const { id } = req.params;
    const user = await Usermodel.findById(id).select("-verifycode -isverified -verifycodeexpire -createdAt -updatedAt -RefreshToken -password -forgotpasswordcode -forgotpasswordcodeexpire");
    if (!user) {
        throw new ApiError(400, "no user found");
    }
    return res.json(new ApiResponse(200, true, "user detail fetched successfully", user));
})
export const changeaccountype = asynchandler(async (req, res) => {
    const { Account_type } = req.body;
    console.log(Account_type);
    if (!Account_type) {
        throw new ApiError(400, "account type is missing")
    }
    const user = await Usermodel.findByIdAndUpdate(req.user._id, {
        $set: {
            Account_type: Account_type
        }
    }, { new: true });
    if (!user) {
        throw new ApiError(500, "internal server error")
    }
    return res.json(new ApiResponse(200, true, "account updated successfully"));
})
export const searchuser = asynchandler(async (req, res) => {
    console.log(req.body)
    const { pattern } = req.body
    if (!pattern) {
        throw new ApiError(400, "no pattern  found");
    }
    const alluser = await Usermodel.aggregate(
        [
            {
                $match: {
                    username: pattern
                }
            }
        ]
    )
    if (!alluser) {
        throw new ApiError(500, "internal server error")
    }
    return res.json(new ApiResponse(200, true, "user detail fetched successfully", alluser));
})
export const recommedation = asynchandler(async (req, res) => {
    const id = req.user.id
    console.log(id)
    const data = await Usermodel.aggregate([
        {
            $match: {
                $and: [
                    {
                        _id: { $ne: id },
                    },
                    {
                        College_Name: req.user.College_Name
                    }
                ]
            }
        }
    ])
    return res.json(new ApiResponse(200, "true", "reco", data))
})