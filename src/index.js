import dotenv from "dotenv";
import express from "express";
import mongoose, { connect } from "mongoose";
import connectDB from "./db/db.js";
import {app} from "./app.js";


dotenv.config({
    path: "./env"
});//make environment variables available to use in the whole project as
connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch((err)=>{
    console.log("Error connecting to MongoDB:", err);
});
