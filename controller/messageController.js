const { Op } = require("sequelize");
const MessageModel = require("../models/MessageModel");

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
        console.log(senderId,recieverId);
        
        const messages=await MessageModel.findAll({
            where:{
              [Op.or]:[
                {senderId:senderId,recieverId:recieverId},
                {senderId:recieverId,recieverId:senderId}
              ] 

            },
            order:[["createdAt","ASC"]]
        })

        res.status(200).json({success:true,messages,message:"Message fetched false"})
        
    } catch (error) {
        res.status(500).json({success:false,message:"Mesage not created"})
        
    }
}


module.exports={
    sendMessage,
    recieveMessage
}