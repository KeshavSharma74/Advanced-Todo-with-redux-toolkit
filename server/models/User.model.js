import mongoose,{Schema} from "mongoose";

const userSchema = Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    todos:[
        { type:Schema.Types.ObjectId,
        ref:"Todo", }
    ]
})

const User = mongoose.model("User",userSchema);

export default User;