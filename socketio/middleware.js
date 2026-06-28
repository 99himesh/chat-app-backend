const jwt=require("jsonwebtoken")
const UserModel=require("../models/UserModel")

module.exports=(io)=>{
    
  io.use(async(socket,next)=>{
        

        try {
        const token=socket.handshake.auth.token;

            const user=await jwt.verify(token,process.env.JWT_SECRET_KEY)  ;
    console.log(user,"dfkjdsfhjsd");
                
            const userData=await UserModel.findByPk(user.userId);
            console.log(userData,",djbfhjdsg");
            
            socket.user=userData;         
            next();
            
        } catch (error) {
        return next(new Error({success:false}))
        }
        

    })

}

  
