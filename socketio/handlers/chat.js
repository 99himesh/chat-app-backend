module.exports=(socket,io)=>{
     socket.on("message",(data)=>{        
        io.emit("recieve-message",{...data,userName:socket.user.name})
     })
     
}