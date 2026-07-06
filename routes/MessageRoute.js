const express=require("express");
const multer = require("multer");
const router=express.Router();
const messageController=require("../controller/messageController.js")


const upload = multer({
    storage: multer.memoryStorage(),
});

router.post("/sendMessage",messageController.sendMessage)
router.get("/recieveMessage",messageController.recieveMessage)
router.post("/media",upload.single("file"),messageController.sendMedia)


module.exports=router;