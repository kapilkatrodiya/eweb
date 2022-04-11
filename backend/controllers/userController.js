const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

//Register User
exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password} = req.body;

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"This is Sample id",
            url:"profilepicUrl"
        }
    });

    sendToken(user,201,res);

});

//Login User
exports.loginUser = catchAsyncErrors(async(req,res,next)=>{

    const {email,password} = req.body;

    //cheaking if user has given password and email both    
    if(!email || !password){
        return next(new ErrorHander("Please Enter Email & Password",400))
    }
    //if got both then find in database
    const user = await User.findOne({ email }).select("+password"); // got user
    
    //if not user
    if(!user){
        return next(new ErrorHander("Invalid email and password",401));
    }

    const isPasswordMatched = user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHander("Invalid email and password",401));
    }
    
    //if matched
    sendToken(user,200,res);
});