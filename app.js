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
//socket io
const   {Server} = require ("socket.io");
const  {createServer} =require("http")

const server=new createServer(app);
const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials:true
    }
});





io.on("connection",(socket)=>{
    console.log("User connected",socket.id);


    socket.on("message",(data)=>{
        console.log(data);
        
    socket.emit("recieve-message",data)
    })
    socket.on("disconnect",()=>{
        console.log("user disconnect");
        
    })    
    
})
//socket io end




app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use("/users",userRoute)
app.use("/message",messageRoute)





 db.sync().then(()=>{
    server.listen(process.env.PORT,(err)=>{
        console.log(`Server is running on port ${process.env.PORT}`); 

    })
    }).catch((err)=>{
            console.log(err);        
})