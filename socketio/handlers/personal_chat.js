const MessageModel=require("../../models/MessageModel.js")



const personalChatHandler=(socket,io)=>{
  console.log(socket.id,"fsfskjjnjknjn");
  
    socket.on("join",(roomName)=>{
        console.log(socket.join,roomName,"roomname");
        
        socket.join(roomName);
        console.log("join successfully");
        
    })
     socket.on("personal-message",async({messageData,roomName,createdAt})=>{ 
        console.log(messageData,"messgae");
        
         await MessageModel.create(messageData)
        io.to(roomName).emit("personal-recieve-message",{...messageData,createdAt})
     })
     
}
// const personalChatHandler = (socket, io) => {
//     socket.on("join", (roomName) => {
//         socket.join(roomName);
//     });

//     socket.on("personal-message", async({messageData,roomName,createdAt}) => {
//          await MessageModel.create(messageData)
//           io.to(roomName).emit("personal-recieve-message", {...messageData,createdAt});
//     });
// };
module.exports={
    personalChatHandler
}
























