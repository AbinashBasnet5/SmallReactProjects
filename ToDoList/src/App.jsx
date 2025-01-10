import { useState, useEffect } from "react";
import { TodoProvider } from "./context/ToDocontext";
import TodoForm from "./assets/Components/TodoForm";
import TodoItem from "./assets/Components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);

  // Retrieve todos from local storage when the app loads
  useEffect(() => {
    const data = localStorage.getItem("todos");
    if (data) {
      setTodos(JSON.parse(data)); // This will update the state correctly
    }
  }, []); // Only runs once when the component mounts

  // Save todos to local storage whenever they change
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos)); // Save entire todos array
    }
  }, [todos]); // Triggered every time todos change

  // Add a new todo
  const addTodo = (todo) => {
    setTodos((prevTodos) => [...prevTodos, { id: Date.now(), ...todo }]);
  };

  // Update a todo
  const updateTodo = (id, updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
    );
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // Toggle completion of a todo
  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-3xl font-medium text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
