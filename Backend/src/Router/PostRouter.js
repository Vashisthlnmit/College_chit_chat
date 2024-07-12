import { Router } from "express";
import { addpost,deletepost,allpostbyuser,noofpostbyuser, allpostoffollowing } from "../Controller/Postapi.js";
import { authmiddleware } from "../Middleware/authmiddleware.js";
import { upload } from "../Middleware/multer.js";
const postrouter=Router();
postrouter.route('/addpost').post(authmiddleware,upload.single("post"),addpost);
postrouter.route('/deletepost/:postid').delete(authmiddleware,deletepost);
postrouter.route('/allpostbyuser/:id').get(authmiddleware,allpostbyuser);
postrouter.route('/noofpostbyuser/:id').get(authmiddleware,noofpostbyuser);
postrouter.route('/allpost').get(authmiddleware,allpostoffollowing)
export {postrouter};