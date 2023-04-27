import React, { useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
	if (action.type === "USER_INPUT") {
		return {
			value: action.value,
			isValid: action.value.includes("@"),
		};
	}
	if (action.type === "INPUT_BLUR") {
		//this will only check the latest state it was entered like a (prevState)=>return {...prevState}
		return {
			value: state.value,
			isValid: state.value.includes("@"),
		};
	}
	return {
		value: "",
		isValid: false,
	};
};

const passwordReducer = (state, action) => {
	if (action.type === "PASS_INPUT") {
		return {
			value: action.value,
			isValid: action.value.trim().length > 6,
		};
	}
	if (action.type === "INPUT_BLUR") {
		return {
			value: state.value,
			isValid: state.value.trim().length > 6,
		};
	}
	return {
		value: "",
		isValid: false,
	};
};
const Login = (props) => {
	// const [enteredEmail, setEnteredEmail] = useState(""); //deprecated because of useReducer
	// const [emailIsValid, setEmailIsValid] = useState();
	// const [enteredPassword, setEnteredPassword] = useState(""); //deprecated because of useReducer
	// const [passwordIsValid, setPasswordIsValid] = useState();

	const [formIsValid, setFormIsValid] = useState(false);

	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value: "",
		isValid: null,
	});

	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
		value: "",
		isValid: null,
	});

	const { isValid: emailIsValid } = emailState; //destructuring a specific part of the state to use in the useEffect
	const { isValid: passwordIsValid } = passwordState;
	useEffect(() => {
		//this use effect works every 500 ms, and the return (or cleanup function) has a clearInterval so we disrupt the 500ms timer everytime
		// you stroke a key on the keyboard, the cleanup works first and then the setTimeout, so it cleans before starting again
		const identifier = setTimeout(() => {
			setFormIsValid(emailIsValid && passwordIsValid);
		}, 500);

		return () => {
			clearInterval(identifier);
		};
	}, [emailIsValid, passwordIsValid]);

	const emailChangeHandler = (event) => {
		//setEnteredEmail(event.target.value); //deprecated because of useReducer
		dispatchEmail({ type: "USER_INPUT", value: event.target.value }); //this is how we call the useReducer function
		// setFormIsValid(event.target.value.includes("@") && passwordState.isValid); //also deprecated because of useReducer - check useEffect
	};

	const passwordChangeHandler = (event) => {
		//setEnteredPassword(event.target.value);
		dispatchPassword({ type: "PASS_INPUT", value: event.target.value });

		// setFormIsValid( //also deprecated because of useReducer - check useEffect
		// 	// enteredEmail.includes("@") && event.target.value.trim().length > 6 //we checked if enteredEmail was valid without useReducer
		// 	emailState.isValid && event.target.value.trim().length > 6
		// );
	};

	const validateEmailHandler = () => {
		dispatchEmail({ type: "INPUT_BLUR" });
		//setEmailIsValid(emailState.isValid); // enteredEmail.includes("@") //this is how checked if enteredEmail was valid without useReducer
	};

	const validatePasswordHandler = () => {
		dispatchPassword({ type: "INPUT_BLUR" });
		// setPasswordIsValid(enteredPassword.trim().length > 6);
	};

	const submitHandler = (event) => {
		event.preventDefault();
		props.onLogin(emailState.value, passwordState.value); // enteredEmail => email info sent before useReducer
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<div
					className={`${classes.control} ${
						emailState.isValid === false ? classes.invalid : ""
					}`}
				>
					<label htmlFor="email">E-Mail</label>
					<input
						type="email"
						id="email"
						value={emailState.value}
						onChange={emailChangeHandler}
						onBlur={validateEmailHandler}
					/>
				</div>
				<div
					className={`${classes.control} ${
						passwordState.isValid === false ? classes.invalid : ""
					}`}
				>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						value={passwordState.value}
						onChange={passwordChangeHandler}
						onBlur={validatePasswordHandler}
					/>
				</div>
				<div className={classes.actions}>
					<Button type="submit" className={classes.btn} disabled={!formIsValid}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;
