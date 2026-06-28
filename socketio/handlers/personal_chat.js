module.exports=(socket,io)=>{

    socket.on("join-room",(roomName)=>{
        socket.join(roomName)
    })
     socket.on("personal-message",(data,roomName)=>{        
        io.emit("personal-recieve-message",{...data,userName:socket.user.name})
     })
     
}