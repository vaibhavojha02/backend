import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema(
  {
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //cloudinary service we will be using here
      required: true,
    },
    coverimage: {
      type: String, //cloudinary service we will be using here
      required: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken : {
      type: String
    }
  },
  { timestamps: true }
)
userSchema.pre("save",async function (next) {
    if(!this.isModified("password"))return next();
    this.password = bcrypt.hash(this.password,10);
    next();
})
// designing of our own methods creatinf new mwthods accorf=ding to our functionality
userSchema.methods.isPassword = async function (password){
 return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken = function(){
  return jwt.sign(
      {
          _id: this._id,
          email: this.email,
          username: this.username,
          fullName: this.fullName
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
  )
}
userSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
      {
          _id: this._id,
          
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
  )
}

export const User = mongoose.model("User", userSchema);
