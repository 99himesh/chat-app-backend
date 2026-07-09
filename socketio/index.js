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
         socketAuth(io)         
         io.on("connection",(socket)=>{                           
           personalChatHandler(socket,io)   
          })


}

module.exports={
    socketConnection
}

