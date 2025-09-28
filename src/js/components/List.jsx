import React, { useState, useEffect } from "react";

//create your first component
const List = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [esconder, setEsconder] = useState(null);
  const API_URL = "https://playground.4geeks.com/todo";
  const user = "esteban"


  const getAllUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/users/`, {
        method: "GET",
      });
      const data = await response.json();
      if (!data.users.find(index => index.name === 'esteban')) {
        createUser();
      } else {
        getAllTasks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createUser = async () => {

    try {
      const response = await fetch(`${API_URL}/users/esteban`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          label: user,
          done: false,
        }),
      })
    } catch (error) {
      console.log(error);

    }
  }

  const getAllTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/users/esteban`, {
        method: "GET",
      });
      const data = await response.json();
      setTodos(data.todos.reverse());
      setInputValue("");
    } catch (error) {
      console.log(error);
    }
  };

  const postTask = async (event) => {
    try {
      if (event.key === "Enter" && inputValue != "") {
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const puthTask = async (id) => {
    try {
      if (inputValue != "") {
        const response = await fetch(`${API_URL}/todos/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            label: inputValue,
            is_done: true,
          }),
        });
        getAllTasks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const delTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: "DELETE",
      });
      getAllTasks();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
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
            {esconder === index && (
              <input className="check"
                type="checkBox"
                onChange={e => puthTask(item.id)} />
            )}
            {item.label}{" "}
            {esconder === index && (
              <i
                className="fa-solid fa-x ex"
                onClick={() => delTask(item.id)}
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
