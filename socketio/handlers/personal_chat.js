module.exports=(socket,io)=>{

    socket.on("join-room",(roomName)=>{
        socket.join(roomName);
        console.log("room joined",roomName)
    })
     socket.on("personal-message",({message,roomName})=>{
        console.log(message,roomName,"fgdfgdfgdf");
                
        io.to(roomName).emit("personal-recieve-message",{message,userName:socket.user.name,roomName})
     })
     
}