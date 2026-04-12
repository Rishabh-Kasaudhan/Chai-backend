import {Router} from "express";
import { registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.model.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        {name:"avatar",maxCount:1},
        {name:"coverImage",maxCount:1}          
    ]),registerUser)
 //THIS middleware multer upload add add on field in req object   
export default router;