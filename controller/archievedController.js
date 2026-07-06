const { Op } = require("sequelize");
const ArchieveModel = require("../models/ArchieveModel")

const getArchieveMessage=async(req,res)=>{
     const {senderId,recieverId}=req.query;
     console.log(senderId,recieverId);
     
   try {
    const messages=await ArchieveModel.findAll({
            where:{  
                        [Op.or]:[
                          {senderId:senderId,recieverId:recieverId},
                          {senderId:recieverId,recieverId:senderId}
                        ] 
          
                      },
                      order:[["createdAt","ASC"]]  
    });
        res.status(200).json({success:true,messages,message:"Message fetched successfully"})

    
   } catch (error) {
        res.status(500).json({success:false,message:"Mesage not created"})
    
   }
}

module.exports={
    getArchieveMessage
}