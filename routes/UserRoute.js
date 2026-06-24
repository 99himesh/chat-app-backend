const express=require("express");
const router=express.Router();
const userController=require("../controller/userController.js")

router.post("/signup",userController.signUp)
router.post("/login",userController.logIn)
router.get("/getUser",userController.getUsers)


module.exports=router;