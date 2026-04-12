import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary=async(localfilePath)=>{
    try{
        if(!localfilePath)return null;
        const result=await cloudinary.uploader.upload(localfilePath,{
            resource_type:"auto"
        })
        console.log("Cloudinary upload result:", result.url);

        return result;

    }
    catch(err){
        fs.unlinkSync(localfilePath);//remove the file from local storage if upload fails
        return null;
    }

}

export { uploadToCloudinary }