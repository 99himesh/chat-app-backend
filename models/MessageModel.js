const {Sequelize,DataTypes}=require("sequelize");
const sequelize=require("../utils/database.js")


const MessageModel=sequelize.define(
    'Message',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        message:{
          type:DataTypes.STRING,
          allowNull:false ,

        },
        senderId:{
          type:DataTypes.INTEGER,
          allowNull:false  ,
        },
       recieverId:{
        type:DataTypes.INTEGER,
        allowNull:false  
       }
        
    }

)


module.exports=MessageModel;