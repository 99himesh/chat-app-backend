const { CronJob } = require("cron");
const MessageModel = require("../models/MessageModel");
const ArchieveModel = require("../models/ArchieveModel");
const sequelize = require("../utils/database");

const archiveChats = async () => {
        try {
         const chats=await MessageModel.findAll({
             raw: true
         });
         if(!chats.length){
             return;
         }        
         await ArchieveModel.bulkCreate(chats);
         const message=await MessageModel.destroy({where:{}});
            
        } catch (error) {
          console.log(error);
            
        }
};

const job = new CronJob(
  "0 0 0 * * *", // Every day at 12:00 AM
  archiveChats,
  null,
  true,
  "Asia/Kolkata"
);