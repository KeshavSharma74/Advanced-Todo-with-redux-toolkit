import User from "../models/User.model.js";
import bcrypt from "bcrypt"
import ApiResponse from "../lib/apiResponse.js";
import jwt from "jsonwebtoken";
import "dotenv/config"

const generateToken = (userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"});

    if(!token){
        console.log("token cannot be generated.");
    }
    res.cookie("jwt",token,{
        httpOnly:true,
        secure:true,
        maxAge:7*24*60*60*1000,
    });
}

const register = async(req,res)=>{

    // console.log("register call hogya");
    const {name,email,password}=req.body;

    try{

        if(!name || !email || !password){
            return new res.json(new ApiResponse(false,"All fields are required"));
        }

        const isPresent = await User.findOne({email});

        // console.log("present nahi hai");

        if(isPresent){
            return res.json(new ApiResponse(false,"Email already registered"));
        }

        const hashedPassword =await bcrypt.hash(password,10);

        if(!hashedPassword){
            return res.json(new ApiResponse(false,"Password cannot be hashed"));
        }

        // console.log("password hash krdiya");

        const user = await User.create({
            name,
            email,
            password:hashedPassword,
        });

        if(!user){
            return res.json(new ApiResponse(false,"User cannot be created"));
        }

        generateToken(user._id,res);

        return res.json(new ApiResponse(true,"User registered successfully",user));

    }
    catch(error){
        console.log(error);
        return res.json(new ApiResponse(false,error.message));
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Validate input
        if (!email || !password) {
            return res.json(new ApiResponse(false, "Email and password are required"));
        }

        // 2. Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.json(new ApiResponse(false, "Invalid email or password"));
        }

        // 3. Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json(new ApiResponse(false, "Invalid email or password"));
        }

        // 4. Generate JWT and set cookie
        generateToken(user._id, res);

        // 5. Send success response (remove password before sending user object)
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
        };

        return res.json(new ApiResponse(true, "Login successful", userData));
    } 
    catch (error) {
        console.log(error);
        return res.json(new ApiResponse(false, error.message));
    }
};

const logout = async(req,res)=>{
    res.clearCookie("jwt",{
        httpOnly:true,
        secure:true
    });
    return res.json(new ApiResponse(true,"User loggedout successfully"));
}



export {register,login,logout}