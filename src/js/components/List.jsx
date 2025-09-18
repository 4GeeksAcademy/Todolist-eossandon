import React, { useState } from "react";

//create your first component
const List = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [esconder, setEsconder] = useState(null);
  return (
    <div className="container">
      <h1>Todo</h1>
      <ul>
        <li>
          <input
            className="Input-group"
            type="text"
            placeholder="Whats need to be done?"
            onKeyPress={(e) => {
              if (e.key === "Enter" && inputValue.length > 0) {
                setTodos(todos.concat(inputValue));
              }
            }}
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
            {item}{" "}
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
