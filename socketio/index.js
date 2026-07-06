const { Server } = require("socket.io");
const  socketAuth  = require("./middleware");
const chatHandler=require("./handlers/chat.js")
const {personalChatHandler}  =require("./handlers/personal_chat.js")
const socketConnection=(server)=>{
        const io=new Server(server,{
            cors:{
                origin:"http://localhost:5173",
                methods:["GET","POST"],
                credentials:true
            }
        });
         console.log(io,"jgjhkfg");

         socketAuth(io)
         console.log("hdfghfghfg");
         
         io.on("connection",(socket)=>{  
            console.log(socket.id,"hgffhgk");
                         
           personalChatHandler(socket,io)   
          })


}

module.exports={
    socketConnection
}

