import React from "react";


//create your first component
const List = () => {
	return (
		<div className="container">
			<h1>My Todo</h1>
			<ul>
				<li><input type = "text" placeholder="Whats need to be done?"></input></li>
				<li>Wash my hands</li>
				<li>Eat</li>
				<li>Walk the dog</li>
			</ul>
			<div>23 task</div>
        </div>
	);
};

export default List;