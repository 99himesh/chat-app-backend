const express=require("express");
const router=express.Router();
const userController=require("../controller/userController.js");
const { authenticate } = require("../middleWare/auth.js");

router.post("/signup",userController.signUp)
router.post("/login",userController.logIn)
router.get("/getUser",userController.getUsers)
router.put("/updateUser/:id",userController.updateUser)
router.get("/getProfile",authenticate,userController.getProfile)

module.exports=router;