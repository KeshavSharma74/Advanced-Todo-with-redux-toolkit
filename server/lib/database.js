import mongoose from "mongoose";

const dbConnect = async()=>{
    try{    
        const connectionInstance = await mongoose.connect(`${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`);
        console.log("Database connected successfully");
    }
    catch(error){
        console.log("Database connection failed");
        process.exit(1);
    }
}

export default dbConnect;