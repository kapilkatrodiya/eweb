const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database")

//Handling Uncaught Exception(with an example an utub)
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server due to Uncaught Exception");
    process.exit(1);
})


//config

dotenv.config({path:"backend/config/config.env"});

//connecting to database  
connectDatabase();

const server = app.listen(process.env.PORT,()=>{   
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
});

//Unhanled Promise rejecction(to avoid server error and as soon as sutdown the server to avoid disgrace😅)
process.on("unhandledRejection", (err)=>{
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server due to Unhanled Promise Rejection");

    server.close(()=>{
        process.exit(1);
    });
})