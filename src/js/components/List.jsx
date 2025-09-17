import React, { useState } from "react";


//create your first component
const List = () => {
	const [ inputValue, setInputValue] = useState("");
	const [ todos, setTodos ] = useState([]);
	return (
		<div className="container">
			<h1>Todo {inputValue} </h1>
			<ul>
				<li><input type = "text" 
					placeholder="Whats need to be done?"
					onKeyPress={(e)=>{
						if (e.key === "Enter") {
							setTodos(todos.concat(inputValue));
						}
					}}
					onChange={(e) => setInputValue(e.target.value)} value={inputValue}>
						
					</input>
				</li>
				{todos.map((item, index) =>(
				<li>
					{item}{" "}
					<i class="fa-solid fa-x"
					 onclick = {() => 
					 	setTodos(
					 		todos.filter(
					 			(t,currentIndex) => 
					 				index != currentIndex))}
					></i>
				</li>
				))}
			</ul>
			<div>23 task</div>
        </div>
	);
};

export default List;