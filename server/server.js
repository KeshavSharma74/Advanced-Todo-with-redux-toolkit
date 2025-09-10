import express from "express";
import "dotenv/config";
import dbConnect from "./lib/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import todoRoute from "./routes/todo.route.js";
import cors from "cors";

const app = express();

// ✅ Configure CORS
app.use(
  cors({
    origin: "https://advanced-todo-with-redux-toolkit-3o.vercel.app", // your frontend URL (React Vite default)
    credentials: true, // allow cookies & auth headers
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/todo", todoRoute);
app.use("/api/user", userRoute);

const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  return res.send("Server is live");
});

app.listen(port, () => {
  console.log(`Server is listening on port : ${port}`);
});

dbConnect();
