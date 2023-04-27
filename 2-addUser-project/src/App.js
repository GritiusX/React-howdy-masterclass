import React, { Fragment, useState } from "react";

import AddUser from "./components/Users/AddUser";
import UsersList from "./components/Users/UsersList";
import Modal from "./components/UI/Modal";

function App() {
	const [users, setUsers] = useState([]);
	const [isError, setIsError] = useState();

	const addUsersHandler = (user) => {
		setUsers((prevUsers) => {
			console.log(user);
			return [user, ...prevUsers];
		});
	};

	const isErrorHandler = (isError) => {
		return setIsError(isError);
	};
	return (
		<Fragment>
			<AddUser onAddUsers={addUsersHandler} isErrorHandler={isErrorHandler} />
			<UsersList users={users} />
			{isError && (
				<Modal
					title={"Oh No! An error occured"}
					message={"Sth went wrong"}
					isErrorHandler={isErrorHandler}
				/>
			)}
		</Fragment>
	);
}

export default App;
