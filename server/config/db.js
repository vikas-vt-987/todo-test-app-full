const mongoose = require('mongoose');
require("dotenv").config();
 async function connectDb(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("db connected successfully");
    }
    catch(err){
        console.log("something went wrong");
    }
}
module.exports = connectDb