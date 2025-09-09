import { Router } from "express";
import { addTodo, deleteTodo, updateTodo } from "../controllers/todo.controller.js";
import protectRoute from "../middlewares/auth.middlware.js";

const todoRoute = Router();

todoRoute.post('/add-todo',protectRoute,addTodo);
todoRoute.put("/update-todo/:todoId", protectRoute, updateTodo);
todoRoute.delete("/delete-todo/:todoId", protectRoute, deleteTodo);

export default todoRoute;