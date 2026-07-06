const express=require("express");
const router=express.Router();
const ArchievedController=require("../controller/archievedController")

router.get("/archievedMessage",ArchievedController.getArchieveMessage)


module.exports=router;