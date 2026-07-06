const { Op } = require("sequelize");
const MessageModel = require("../models/MessageModel");
const { awsS3Services } = require("../services/awsS3bucket");

const sendMessage=async(req,res,)=>{
    try {
        const {senderId,recieverId,message}=req.body;
        const messages=await MessageModel.create({senderId,recieverId,message});
        res.status(201).json({success:true,messages,message:'message created successsfully'})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:"Mesage not created"})
        
    }
}



const recieveMessage=async(req,res)=>{
    try {
        const {senderId,recieverId}=req.query;
        const messages=await MessageModel.findAll({
            where:{  
              [Op.or]:[
                {senderId:senderId,recieverId:recieverId},
                {senderId:recieverId,recieverId:senderId}
              ] 

            },
            order:[["createdAt","ASC"]]
        })

        res.status(200).json({success:true,messages,message:"Message fetched successfully"})

        
    } catch (error) {
        res.status(500).json({success:false,message:"Mesage not created"})
        
    }
}


     const sendMedia=async(req,res)=>{            

        try {
            const file = req.file;
            console.log(file,"file");
            
    
    
            const url = await awsS3Services(file);
        
            res.json({
                url,success:true,message:"Image upload successfully"
            });
            
    
           
        } catch (error) {
           console.log(error);
            
        }
    }

module.exports={
    sendMessage,
    recieveMessage,
    sendMedia
}