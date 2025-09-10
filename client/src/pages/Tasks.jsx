import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { getTodos, addTodo, deleteTodo, updateTodo } from "@/features/todoSlice";

const Tasks = () => {
  const { todos, loading, error } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const handleAddOrUpdate = () => {
    if (!text.trim()) return;

    if (editId) {
      dispatch(updateTodo({ todoId: editId, todo: text }));
      setEditId(null);
    } else {
      dispatch(addTodo(text));
    }
    setText("");
  };

  const handleEdit = (todo) => {
    setText(todo.todo);
    setEditId(todo._id);
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="mb-8 flex flex-col items-center">
      <div className="flex flex-col items-center -mt-10 w-[500px] border p-3 px-8 rounded-xl">
        {/* Input section */}
        <div className="flex gap-4 mb-6 m-3 w-full">
          <Input
            className="rounded-md border border-gray-300 px-3 py-2"
            placeholder="Add a new task"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            className="px-6 py-2 rounded-md"
            onClick={handleAddOrUpdate}
            disabled={loading}
          >
            {editId ? "Update Task" : "Add Task"}
          </Button>
        </div>

        {/* Todo list */}
        <div className="w-full flex flex-col gap-3">
          {loading && <p className="text-gray-500">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {todos.map((todo) => (
            <div
              key={todo._id}
              className="flex justify-between items-center border border-gray-200 rounded-md p-3 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <span>{todo.todo}</span>
              <div className="flex gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(todo)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(todo._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
