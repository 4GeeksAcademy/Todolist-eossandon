import React, { useState, useEffect } from "react";

//create your first component
const List = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [esconder, setEsconder] = useState(null);
  const API_URL = "https://playground.4geeks.com/todo";

  const getAllTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/users/esteban`, {
        method: "GET",
      });
      const data = await response.json();
      setTodos(data.todos.reverse());
      console.log(data.todos);
      setInputValue("");
      getAllTasks;
    } catch (error) {
      console.log(error);
    }
  };

  const postTask = async (event) => {
    try {
      if (event.key === "Enter") {
        const response = await fetch(`${API_URL}/todos/esteban`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            label: inputValue,
            done: false,
          }),
        });
        getAllTasks();
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <div className="container">
      <h1>Todo</h1>
      <ul>
        <li>
          <input
            className="Input-group"
            type="text"
            onKeyPress={postTask}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          ></input>
        </li>
        {todos.map((item, index) => (
          <li
            key={index}
            onMouseOver={() => setEsconder(index)}
            onMouseLeave={() => setEsconder(null)}
          >
            {item.label}{" "}
            {esconder === index && (
              <i
                className="fa-solid fa-x ex"
                onClick={() =>
                  setTodos(
                    todos.filter((t, currentIndex) => index != currentIndex)
                  )
                }
              ></i>
            )}
          </li>
        ))}
      </ul>
      <div> {todos.length} Item Left </div>
    </div>
  );
};

export default List;
