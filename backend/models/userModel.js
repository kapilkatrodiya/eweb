const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        maxlength:[30,"Name cannot ecxeed 30 characters"],
        minlength:[4,"Name should have more then 4 characters"]
    },
    
})