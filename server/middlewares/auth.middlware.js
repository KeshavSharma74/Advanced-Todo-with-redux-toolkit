import ApiResponse from "../lib/apiResponse.js";
import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const protectRoute = async(req,res,next)=>{
    try{

        const token = req.cookies.jwt;

        if(!token){
            return res.json(new ApiResponse(false,"Unauthorized"));
        }

        const {userId} = jwt.verify(token,process.env.JWT_SECRET);

        const user=await User.findById(userId).select("-password");

        if(!user){
            return res.json(new ApiResponse(false,"Invalid token"))
        }

        req.user = user;

        next();

    }
    catch(error){
        console.log(error);
        return res.json(new ApiResponse(false,error.message));
    }
}

export default protectRoute;