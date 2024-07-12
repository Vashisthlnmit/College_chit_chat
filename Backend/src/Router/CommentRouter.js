import { Router } from "express";
import { addcomment,deletecomment,noofcommentonpost,allcommentonpost,commentbyuser } from "../Controller/Commentapi.js";
import { authmiddleware } from "../Middleware/authmiddleware.js";
const commentrouter=Router();
commentrouter.route('/add').post(authmiddleware,addcomment);
commentrouter.route('/del/:commentid').delete(authmiddleware,deletecomment);
commentrouter.route('/nocom/:postid').get(authmiddleware,noofcommentonpost);
commentrouter.route('/allcom/:postid').get(authmiddleware,allcommentonpost);
commentrouter.route('/nobyuser').get(authmiddleware,commentbyuser);
export{commentrouter};