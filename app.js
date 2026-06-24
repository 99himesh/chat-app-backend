require("dotenv").config()
const express=require("express");
const app=express();
const cors=require("cors");
const db=require("./utils/database.js");
const bodyParser = require('body-parser');
//model
const UserModel=require("./models/UserModel.js")
const MessageModel=require("./models/MessageModel.js")
const userRoute=require("./routes/UserRoute.js")
const messageRoute=require("./routes/MessageRoute.js")
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use("/users",userRoute)
app.use("/message",messageRoute)

 db.sync().then(()=>{
    app.listen(3000,(err)=>{
        console.log("Server is running"); 
    })
    }).catch((err)=>{
            console.log(err);        
})