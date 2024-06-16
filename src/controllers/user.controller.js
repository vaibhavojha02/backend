import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apierror.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const registerUser =  asyncHandler(async (req,res) => {
  //get users details from frontend
  // validation -not empty
  // check if user already exists
  //check for images and check for avatar
  //create usery object and create user entry in db
  //remove password and refresh token field from response
  //check for user creation
  //return res
  const {username , fullname , email , avatar} = req.body
  console.log(email);

  if(
    [username , fullname , email , avatar].some((field)=> field?.trim()==="")
  )
  {
    throw new ApiError(400,"all fields are required")
  }
  const existedUser = User.findOne({
    // query to check for 2 input fiels in data
    $or : [{ username },{ email }] 
  })
  if(existedUser) {
    throw new ApiError(409 , "user already exists")
  }
  const avatarLocalPath = req.files?.avatar[0]?.path
  const coverImageLocalPath = req.files?.coverImage[0]?.path
  if(!avatarLocalPath){
    throw new ApiError(400,"avatar file is required")
  }

  const avatarU  = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if(!avatarU){
    throw new ApiError(400,"avatar file is required")
  }
  const user = await User.create({
    fullname,
    avatar: avatarU.url,
    ////optional chaining kehte hai isko ?.
    coverImage : coverImage?.url||"",
    email,
    password,
    username:username.toLowerCase()
  })
 const createdUser =  await User.findById(user._id).select("-password -refreshToken");
 if(!createdUser){
  throw new ApiError(500,"soemthing error has been occured");
 }
})

export {registerUser}