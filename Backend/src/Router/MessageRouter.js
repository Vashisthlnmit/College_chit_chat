import { Router } from "express";
import { addmessage,deletemessage,getallmessageofchat } from "../Controller/Messageapi.js";
import { authmiddleware } from "../Middleware/authmiddleware.js";
import { upload } from "../Middleware/multer.js";
const messagerouter=Router();
messagerouter.route('/getallmess/:chatid').get(getallmessageofchat)
messagerouter.route('/addmess').post(authmiddleware,upload.single("attachement"),addmessage)
messagerouter.route('/delemess/:messageid/:chatid').delete(authmiddleware,deletemessage)
export {messagerouter}