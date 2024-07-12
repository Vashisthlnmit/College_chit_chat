import { Router } from "express";
import { Creategroupchat,Createonetoonechat,Addparticipants,removeparticipants,deltechat,renamechat,availableuserofchat,getallchat,leavechatgroup } from "../Controller/Chatapi.js";
import { authmiddleware } from "../Middleware/authmiddleware.js";
const ChatRouter=Router()
ChatRouter.route('/creategrpchat').post(authmiddleware,Creategroupchat)
ChatRouter.route('/createonechat').post(authmiddleware,Createonetoonechat)
ChatRouter.route('/addparti').post(authmiddleware,Addparticipants)
ChatRouter.route('/removeparti').post(authmiddleware,removeparticipants)
ChatRouter.route('/delechat/:chatid').delete(authmiddleware,deltechat)
ChatRouter.route('/renamechat').patch(authmiddleware,renamechat)
ChatRouter.route('/avaiuser/:chatid').get(authmiddleware,availableuserofchat)
ChatRouter.route('/getallchat').get(authmiddleware,getallchat)
ChatRouter.route('/leave').post(authmiddleware,leavechatgroup)
export {ChatRouter}