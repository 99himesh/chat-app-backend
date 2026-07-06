const {Sequelize,DataTypes}=require("sequelize");
const sequelize=require("../utils/database.js")


const ArchieveModel=sequelize.define(
    'Archieve',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
         senderId:{
          type:DataTypes.INTEGER,
          allowNull:false  ,
        },
        recieverId:{
          type:DataTypes.INTEGER,
          allowNull:false  
        },
         messageType:{
           type:DataTypes.STRING,
           allowNull:false ,
        },
        message:{
          type:DataTypes.STRING,
        },
        media:{
           type:DataTypes.STRING
        }
    }

)


module.exports=ArchieveModel;