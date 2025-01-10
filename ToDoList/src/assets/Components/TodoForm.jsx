import React from "react";
import { useState } from "react";
import { useTodo } from '../../context/ToDocontext'
function TodoForm() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();
  const add = (e) => {
    e.preventDefault();
    if (!todo) return;
    addTodo({
      todo,
      completed: false,
    });
    setTodo("");
  };
  return (
    <form onSubmit={add} className="flex justify-end">
      <input
        type="text"
        placeholder="Write Todo..."
        className="font-medium w-[585px] flex-grow border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="font-medium rounded-r-lg px-3 py-1.5 bg-green-600 text-white shrink-0 "
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
