import express from "express";
import "dotenv/config"
import dbConnect from "./lib/database.js";
const app=express();

const port=process.env.PORT || 4000;

app.get('/',(req,res)=>{
    return res.send("Server is live");
})

app.listen(port,()=>{
    console.log(`Server is listening on port : ${port}`);
})

dbConnect();