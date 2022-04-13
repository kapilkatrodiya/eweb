const ErrorHander = require("../utils/errorhander");
const Errorhander = require("../utils/errorhander");

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

//Wrong mongodb id err (the type of this err called cast err)
if(err.name == "CastError"){
    const message = `Resource not found. Invalid:${err.path}`;
    err= new Errorhander(message,400);
}

//Mongoose duplicate key arror
if(err.code === 11000){
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHander(message, 400);
};

//Wrong JWT Token
if(err.name == "JsonWebTokenError"){
    const message = `Json Web Token is invalid, Try again`;
    err= new Errorhander(message,400);
}

//JWT Expire Error
if(err.name == "TokenExpiredError"){
    const message = `Json Web Token is Expired, Try again`;
    err= new Errorhander(message,400);
}

    res.status(err.statusCode).json({
        success:false,
        message: err.message,
    })
}