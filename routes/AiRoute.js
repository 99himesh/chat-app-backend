const express=require("express");
const router=express.Router();
const aiController=require("../controller/aiController")
router.post("/predictive",aiController.predictive)
router.post("/smartReply",aiController.smartReply)


module.exports=router;