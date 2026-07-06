const jwt=require("jsonwebtoken")
const UserModel=require("../models/UserModel")

module.exports=(io)=>{
    
  io.use(async(socket,next)=>{
        

        try {
        const token=socket.handshake.auth.token;
console.log(token);

            const user=await jwt.verify(token,process.env.JWT_SECRET_KEY)  ;
                
            const userData=await UserModel.findByPk(user.userId);
            console.log(userData);
            
            socket.user=userData;                     
            next();
            
        } catch (error) {
             console.log(error);
        return next(new Error({success:false}))
        }
        

    })

}

  
