import mongoose, { Mongoose } from "mongoose";

const todoSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    todo:{
        type:String,
        required:true,
    }
})

const Todo = mongoose.model("Todo",todoSchema);

export default Todo;