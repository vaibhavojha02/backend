import dotenv from "dotenv"
import { app } from "./app.js";

import connectDB from "./db/index.js";
dotenv.config({
  path: './env'
})
connectDB().then(()=>{
  app.listen(process.env.PORT||8000,()=>{
    console.log(`server is running ${process.env.PORT}`);
  })
 
}).catch((err)=>{
  console.log("connection failed with mongodb",err)
})
























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