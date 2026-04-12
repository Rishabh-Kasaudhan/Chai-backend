import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    //get user details from frontend
    //validate -not empty
    //check if user already exists
    //check for images,check for avatar
    //upload images to cloudinary,avatar
    //crate user object -create entry in database
    //reove password and refresh token field from response
    //check for user creation
    //return response 

    const {fullName, email, password,username} =req.body
    console.log("email ",email);
    // if(fullName===''){
    //     throw new ApiError(400,"Full name is required")
    // }
    if([fullName,email,password,username].some((field)=> field?.trim()==='')){
    throw new ApiError(400,"All fields are required")
    }
    const existedUser=await User.findOne({
        $or: [{email},{username}]
    })
    if(existedUser){
        throw new ApiError(409,"User already exists with this email or username")
    }
   
    
    const avatarLocalPath = req.files?.avatar?.[0]?.path;//fisrt property has path of uploaded file in multer and take it optionally
    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar image is required");
    }

    const avatar = await uploadToCloudinary(avatarLocalPath);
    if (!avatar) {
        throw new ApiError(500, "Error uploading avatar image");
    }

    let coverImage = null;
    if (coverImageLocalPath) {
        coverImage = await uploadToCloudinary(coverImageLocalPath);
        if (!coverImage) {
            throw new ApiError(500, "Error uploading cover image");
        }
    }

    const user = await User.create({
        fullName,
        email,
        password,
        username: username.toLowerCase(),
        avatar: avatar.url,
        coverImage: coverImage?.url || ""
    })
    const createsUser=await User.findById(user._id).select("-password -refreshToken")
    if(!createsUser){
        throw new ApiError(500,"Error creating user")
    }
    return res.status(201).json(new ApiResponse(200, createsUser, "User created successfully"))

})

export {registerUser}
