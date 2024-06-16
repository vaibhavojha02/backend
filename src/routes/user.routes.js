import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router()

router.route("/register").post(
  // middleware -"jaate hue mujhse milte hue jaana"
  upload.fields([
    {
      //there should be proper communication between frontend and backend enginer it means theres avatar must also be there in frontend 
      name : "avatar",
      maxCount :1 
    },
    {
      name:"coverImage",
      maxCount:1
    }
  ])
  ,registerUser
)

export default router