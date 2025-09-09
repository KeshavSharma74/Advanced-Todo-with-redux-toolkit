import { Router } from "express";
import { checkAuth, getAllTodoOfUser, login, logout, register } from "../controllers/user.controller.js";
import protectRoute from "../middlewares/auth.middlware.js";

const userRoute = Router();

userRoute.post('/register',register);
userRoute.post('/login',login);
userRoute.post('/logout',logout);
userRoute.get('/check-auth',protectRoute,checkAuth);
userRoute.get('/get-todos',protectRoute,getAllTodoOfUser);

export default userRoute;