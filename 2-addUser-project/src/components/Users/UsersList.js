import React from "react";

import Card from "../UI/Card";
import "./UsersList.css";

const UsersList = (props) => {
	return (
		<Card className="users">
			<ul>
				{props.users.map((user, i) => (
					<li key={i}>
						{user.name} ({user.age} years old)
					</li>
				))}
			</ul>
		</Card>
	);
};

export default UsersList;
