import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://advanced-todo-with-redux-toolkit.vercel.app/api/todo";
axios.defaults.withCredentials = true;

// 🔹 Get all todos for logged-in user
export const getTodos = createAsyncThunk(
  "todos/getTodos",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`https://advanced-todo-with-redux-toolkit.vercel.app/api/user/get-todos`, { withCredentials: true });
      return res.data.data.todos; // user.todos is populated
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch todos");
    }
  }
);

// 🔹 Add a new todo
export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (todoText, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/add-todo`, { todo: todoText }, { withCredentials: true });
      return res.data.data; // newTodo
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to add todo");
    }
  }
);

// 🔹 Update a todo
export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ todoId, todo }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_URL}/update-todo/${todoId}`, { todo }, { withCredentials: true });
      return res.data.data; // updated todo
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update todo");
    }
  }
);

// 🔹 Delete a todo
export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (todoId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/delete-todo/${todoId}`, { withCredentials: true });
      return todoId; // return deleted id so we can filter it out
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete todo");
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Todos
      .addCase(getTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Todo
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })

      // Update Todo
      .addCase(updateTodo.fulfilled, (state, action) => {
        const idx = state.todos.findIndex((t) => t._id === action.payload._id);
        if (idx !== -1) state.todos[idx] = action.payload;
      })

      // Delete Todo
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((t) => t._id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
