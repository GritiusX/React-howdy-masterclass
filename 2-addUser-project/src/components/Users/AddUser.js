import React, { useRef } from "react";

import Card from "../UI/Card.js";
import Button from "../UI/Button.js";
import "./AddUser.css";

// THIS IS AN UNCONTROLLED COMPONENT BECAUSE IS NOT USING ANY REACT TO CHECK STATE - WE ARE NOT CONTROLLING THE STATE WITH REACT BUT WITH USEREF

function AddUser(props) {
	const nameInputRef = useRef(); // with this refs I dont need to change the state and then make it blank after submiting
	const ageInputRef = useRef(); //

	//const [enteredUsername, setEnteredUsername] = useState(""); //because of useRef I dont need this states anymore
	//const [enteredAge, setEnteredAge] = useState("");

	const addUserHandler = (e) => {
		e.preventDefault();
		const inputUsername = nameInputRef.current.value;
		const inputAge = ageInputRef.current.value;

		if (inputUsername.trim().length === 0 || inputAge.trim().length === 0) {
			const isError = true;
			return props.isErrorHandler(isError);
		}
		if (+inputAge < 1) {
			const isError = true;
			return props.isErrorHandler(isError);
		}

		const newAddedUser = {
			name: inputUsername.trim(),
			age: parseInt(inputAge.trim()),
		};

		props.onAddUsers(newAddedUser);
		nameInputRef.current.value = "";
		ageInputRef.current.value = "";
	};

	// with useRef this is not needed anymore

	// const usernameChangeHandler = (e) => {
	// 	setEnteredUsername(e.target.value);
	// };
	// const ageChangeHandler = (e) => {
	// 	setEnteredAge(e.target.value);
	// };

	return (
		<Card className="input">
			<form onSubmit={addUserHandler}>
				<label htmlFor="username">Username</label>
				<input id="username" type="text" ref={nameInputRef} />
				<label htmlFor="age">Age (Years)</label>
				<input id="age" type="number" ref={ageInputRef} />
				<Button type="submit">Submit</Button>
			</form>
		</Card>
	);
}

export default AddUser;
