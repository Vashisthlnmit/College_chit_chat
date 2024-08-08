import { Router } from "express";
import { Signin, Signup,Verification,Forgotpassword,Forgotpasswordverification,RefreshAccesstoken,Logout,changeaccountype,getuserdetailbyuser, searchuser, recommedation} from "../Controller/Userapi.js";
import { upload } from "../Middleware/multer.js";
import { authmiddleware } from "../Middleware/authmiddleware.js";
const userrouter=Router();
userrouter.route('/signup').post(Signup);
userrouter.route('/signin').post(Signin);
userrouter.route('/verify').post(Verification);
userrouter.route('/forgotpass').post(authmiddleware,Forgotpassword);
userrouter.route('/forgotpassverify').post(authmiddleware,Forgotpasswordverification);
userrouter.route('/refresh').post(authmiddleware,RefreshAccesstoken);
userrouter.route('/Logout').post(authmiddleware,Logout);
userrouter.route('/infouser/:id').get(authmiddleware,getuserdetailbyuser);
userrouter.route('/Changeacc').post(authmiddleware,changeaccountype);
userrouter.route('/search').post(searchuser);
userrouter.route('/reco').get(authmiddleware,recommedation)
export {userrouter};