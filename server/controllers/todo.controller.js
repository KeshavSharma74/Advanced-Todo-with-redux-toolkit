import ApiResponse from "../lib/apiResponse.js";
import Todo from "../models/Todo.model.js";
import User from "../models/User.model.js";

const addTodo = async(req,res) =>{
    const userId=req.user._id;
    const {todo} = req.body;
    try{
        if(!userId){
            return res.json(new ApiResponse(false,"User not present"));
        }
        if(!todo){
            return res.json(new ApiResponse(true,"Todo is required"));
        }
        const newTodo = await Todo.create({
            user:userId,
            todo
        });

        if(!newTodo){
            return res.json(new ApiResponse(false,"Todo cannot be added"));
        }

        await User.findByIdAndUpdate(userId,{
            $push:{todos:newTodo._id}
        });

        return res.json(new ApiResponse(true,"Todo Added Successfully",newTodo));

    }
    catch(error){
        console.log(error);
        return res.json(new ApiResponse(false,error.message));
    }
}

const updateTodo = async (req, res) => {
    const userId = req.userId; // middleware sets this
    const { todoId } = req.params; // pass todoId in URL
    const { todo } = req.body; // new todo text

    try {
        if (!userId) {
            return res.json(new ApiResponse(false, "User not present"));
        }
        if (!todoId || !todo) {
            return res.json(new ApiResponse(false, "Todo ID and updated todo are required"));
        }

        // find the todo and ensure it belongs to the logged-in user
        const existingTodo = await Todo.findOne({ _id: todoId, user: userId });

        if (!existingTodo) {
            return res.json(new ApiResponse(false, "Todo not found or not authorized"));
        }

        // update the todo
        existingTodo.todo = todo;
        await existingTodo.save();

        return res.json(new ApiResponse(true, "Todo updated successfully", existingTodo));

    } catch (error) {
        console.log(error);
        return res.json(new ApiResponse(false, error.message));
    }
};

const deleteTodo = async (req, res) => {
    const userId = req.userId;
    const { todoId } = req.params;

    try {
        if (!todoId) {
            return res.json(new ApiResponse(false, "Todo ID is required"));
        }

        const existingTodo = await Todo.findOne({ _id: todoId, user: userId });

        if (!existingTodo) {
            return res.json(new ApiResponse(false, "Todo not found or not authorized"));
        }

        // delete todo
        await Todo.findByIdAndDelete(todoId);

        // remove reference from user.todos
        await User.findByIdAndUpdate(userId, {
            $pull: { todos: todoId }
        });

        return res.json(new ApiResponse(true, "Todo deleted successfully"));

    } catch (error) {
        console.log(error);
        return res.json(new ApiResponse(false, error.message));
    }
};

export {addTodo,updateTodo,deleteTodo}