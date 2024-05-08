import dotenv from "dotenv"
import express from "express";
import connectDB from "./db/index.js";
dotenv.config({
  path: './env'
})
const app = express();
/*
;(async () => {
  try {
   await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    app.on("error",(error) => {
      console.log("error",error);
      throw error
    })
    app.listen(process.env.PORT,()=>{
      console.log(`App is listening on ${process.env.PORT}`)
    })
  } catch (error) {
    console.error("error",error);
    throw error
  }
})()
*/
connectDB();