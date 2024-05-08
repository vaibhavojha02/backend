import { v2 as cloudinary } from "cloudinary";
import fs, { unlink } from "fs";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})
const uploadOnCloudinary = async (filepath) =>{
    try {
      if(!filepath)return null;
      //upload file using cloudinary
      const response = cloudinary.uploader.upload(filepath,{resource_type: "auto"})
      console.log("file has been successfully uploaded",response.url)
      return response;
      
    } catch (error) {
      fs.unlinkSync(filepath) //remove the file as operation got failed
      return null;
    }
}
export {uploadOnCloudinary}
