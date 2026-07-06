const {Sequelize,DataTypes}=require("sequelize");
const sequelize=require("../utils/database.js")


const users=sequelize.define(
    'users',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        name:{
          type:DataTypes.STRING,
          allowNull:false ,

        },
        email:{
          type:DataTypes.STRING,
          allowNull:false  ,
          unique:true 
        },
        profile:{
          type:DataTypes.STRING,

        },
        cover:{
          type:DataTypes.STRING,
        },
        location:{
          type:DataTypes.STRING,
        },
        dob:{
          type:DataTypes.STRING,
        },
        maritalStatus:{
          type:DataTypes.STRING,
        },
        gender:{
          type:DataTypes.STRING,
        },
        language: {
          type: DataTypes.STRING
          },
        mobile:{
          type:DataTypes.STRING,
          allowNull:false  
        },
        password:{
          type:DataTypes.STRING,
          allowNull:false  
        }
        
    }

)


module.exports=users;