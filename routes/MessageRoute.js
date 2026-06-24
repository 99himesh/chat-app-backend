const express=require("express");
const router=express.Router();
const messageController=require("../controller/messageController.js")

router.post("/sendMessage",messageController.sendMessage)
router.get("/recieveMessage",messageController.recieveMessage)



module.exports=router;