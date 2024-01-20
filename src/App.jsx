import { useState } from "react";
import "./style.css";

export default function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState([]);

  //handle submit function for Add btn
  function handleSubmit(e) {
    //prevents reloading the page after clicking add
    e.preventDefault();

    //Logic for adding items to the list
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false },
      ];
    });

    //Clears input form after clicking the add button
    setNewItem("");
  }

  //handle check buttons to indicate the item in the list is checked
  function toggleTodo(id, completed) {
    //Logic for checking the items in the list
    setTodos((currentTodos) => {
      return currentTodos.map((todos) => {
        if (todos.id === id) {
          return { ...todos, completed };
        }

        return todos;
      });
    });
  }

  function deleteTodoItem(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todos) => todos.id != id);
    });
  }

  return (
    <div>
      <h1 className="header">Todo List</h1>
      <ul className="list">
        {todos.map((todos) => {
          return (
            <li key={todos.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todos.completed}
                  onChange={(e) => toggleTodo(todos.id, e.target.checked)}
                />
                {todos.title}
              </label>
              <button
                onClick={() => deleteTodoItem(todos.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
      <form className="new-item-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label className="label-new-item" htmlFor="item">
            New Item
          </label>
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            type="text"
            id="item"
          />
        </div>
        <button className="btn">Add</button>
      </form>
    </div>
  );
}
