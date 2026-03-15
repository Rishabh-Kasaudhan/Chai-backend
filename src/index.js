import dotenv from "dotenv";

import mongoose, { connect } from "mongoose";
import connectDB from "./db/db.js";


dotenv.config({
    path: "./env"
});


connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch((err)=>{
    console.log("Error connecting to MongoDB:", err);
});