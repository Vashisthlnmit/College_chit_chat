import { Router } from "express";
import { sendfollowfriend,acceptfollowrequest,unfollowfriend,follower,following,noofollowing,noofollower,getallfollowrequestofuser, givingpermissiotoviewaccount, } from "../Controller/Followapi.js";
import { authmiddleware } from "../Middleware/authmiddleware.js";
const followrouter=Router();
followrouter.route('/sendfollow/:friendid').post(authmiddleware,sendfollowfriend);
followrouter.route('/accept/:followrequestid').post(authmiddleware,acceptfollowrequest);
followrouter.route('/unfollow').post(authmiddleware,unfollowfriend);
followrouter.route('/follower/:id').get(authmiddleware,follower);
followrouter.route('/following/:id').get(authmiddleware,following);
followrouter.route('/nofollow/:id').get(authmiddleware,noofollower);
followrouter.route('/noffolowing/:id').get(authmiddleware,noofollowing);
followrouter.route('/getallfollowreq').get(authmiddleware,getallfollowrequestofuser);
followrouter.route('/checkpermission').get(authmiddleware,givingpermissiotoviewaccount)
export {followrouter}