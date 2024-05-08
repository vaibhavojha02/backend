import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import "dotenv/config";
 const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `Congratulations we are on another continenet,mongoDb it is ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Database is not connected", error);
    process.exit(1);
  }
}
export default connectDB
 
