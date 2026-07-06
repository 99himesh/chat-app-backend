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
const messageRoute=require("./routes/MessageRoute.js");
const archievedMessageRoute=require("./routes/ArchievedRoute.js");
const AiRoute=require("./routes/AiRoute.js");
//socket io
const  {createServer} =require("http")
const jwt=require("jsonwebtoken")
const {socketConnection}=require("./socketio/index.js")
const cron=require("./services/chroneService.js")
const server=new createServer(app);






app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use("/users",userRoute)
app.use("/message",messageRoute)
app.use("/archieved",archievedMessageRoute)
app.use("/ai",AiRoute)



socketConnection(server)


 db.sync().then(()=>{
    server.listen(process.env.PORT,(err)=>{
        console.log(`Server is running on port ${process.env.PORT}`); 

    })
    }).catch((err)=>{
            console.log(err);        
})