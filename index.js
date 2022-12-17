const express = require('express');
const { connection } = require('./config/db');
const { userRouter } = require('./Routes/auth.router');
const {jobRouter} = require("./Routes/job.router")
require("dotenv").config();
const cors = require("cors")

const app=express();
const port = process.env.PORT || 8000
app.use(cors());
app.use(express.json());



app.get("/",(req,res)=>{
    res.send("Welcome To Homepage")
});
app.use("/auth",userRouter);
app.use("/job", jobRouter);


app.listen(port,async()=>{
    try {
        await connection
        console.log("connected to db");
    } catch (error) {
        console.log("something went wrong");
        console.log(error);
    }
    console.log("port is running");
})