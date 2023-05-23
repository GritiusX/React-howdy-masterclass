import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
	const {
		value: enteredName,
		hasError: nameInputHasError,
		isValid: enteredNameIsValid,
		valueChangeHandler: nameChangeHandler,
		reset: resetNameHandler,
		inputBlurHandler: nameBlurHandler,
	} = useInput((value) => value.trim() !== "");

	const {
		value: enteredEmail,
		hasError: emailInputHasError,
		reset: resetEmailHandler,
		isValid: emailIsValid,
		valueChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
	} = useInput((value) => value.includes("@"));

	let formIsValid = false;

	if (enteredNameIsValid && emailIsValid) {
		formIsValid = true;
	}

	const formSubmissionHandler = (event) => {
		event.preventDefault();
		nameBlurHandler(true);

		if (!enteredNameIsValid) {
			return;
		}
		console.log("state =>", enteredName);

		resetNameHandler();
		resetEmailHandler();
	};

	const nameInputClasses = nameInputHasError
		? "form-control invalid"
		: "form-control";

	const emailInputClasses = emailInputHasError
		? "form-control invalid"
		: "form-control";

	return (
		<form onSubmit={formSubmissionHandler}>
			<div className={nameInputClasses}>
				<label htmlFor="name">Your Name</label>
				<input
					type="text"
					id="name"
					onChange={nameChangeHandler}
					onBlur={nameBlurHandler}
					value={enteredName}
				/>
				{nameInputHasError && <p className="error-text">name is invalid</p>}
			</div>
			<div className={emailInputClasses}>
				<label htmlFor="name">Your Email</label>
				<input
					type="email"
					id="Email"
					onChange={emailChangeHandler}
					onBlur={emailBlurHandler}
					value={enteredEmail}
				/>
				{emailInputHasError && <p className="error-text">Email is invalid</p>}
			</div>
			<div className="form-actions">
				<button disabled={!formIsValid}>Submit</button>
			</div>
		</form>
	);
};

export default SimpleInput;

// FIRST UPDATE WITH CUSTOM HOOK USEINPUT
// import { useEffect, useState } from "react";
// import useInput from "../hooks/use-input";

// const SimpleInput = (props) => {
// 	const {
// 		value: enteredName,
// 		hasError: nameInputHasError,
// 		isValid: enteredNameIsValid,
// 		valueChangeHandler: nameChangeHandler,
// 		reset: resetNameHandler,
// 		inputBlurHandler: nameBlurHandler,
// 	} = useInput((value) => value.trim() !== "");
// 	// const [enteredName, setEnteredName] = useState(""); //this 2 states are deprecated since we are using ==> NAME
// 	// const [enteredNameIsTouched, setEnteredNameIsTouched] = useState(false); //the custom Hook useInput ==> NAME
// 	const [enteredEmail, setEnteredEmail] = useState(""); //this 2 states are deprecated since we are using ==> EMAIL
// 	const [enteredEmailIsTouched, setEnteredEmailIsTouched] = useState(false); //the custom Hook useInput ==> EMAIL

// 	// const enteredNameIsValid = enteredName.trim() !== "";
// 	// const nameInputIsInvalid = !enteredNameIsValid && enteredNameIsTouched; //SAME with this 2 variables

// 	// const nameInputChangeHandler = (event) => { //DEPRECATED because of custom Hook
// 	// 	setEnteredName(event.target.value);
// 	// };

// 	// const nameInputBlurHandler = (event) => { //DEPRECATED because of custom Hook
// 	// 	setEnteredNameIsTouched(true);
// 	// };

// 	const enteredEmailIsValid = enteredEmail.includes("@");
// 	const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailIsTouched;

// 	let formIsValid = false;
// 	if (enteredNameIsValid && enteredEmailIsValid) {
// 		formIsValid = true;
// 	}

// 	const emailInputChangeHandler = (event) => {
// 		setEnteredEmail(event.target.value);
// 	};

// 	const emailInputBlurHandler = (event) => {
// 		setEnteredEmailIsTouched(true);
// 	};

// 	const formSubmissionHandler = (event) => {
// 		event.preventDefault();
// 		nameBlurHandler(true);

// 		if (!enteredNameIsValid) {
// 			return;
// 		}
// 		console.log("state =>", enteredName);

// 		resetNameHandler();
// 		setEnteredEmail("");
// 		setEnteredEmailIsTouched(false);
// 	};

// 	const nameInputClasses = nameInputHasError
// 		? "form-control invalid"
// 		: "form-control";

// 	const emailInputClasses = emailInputIsInvalid
// 		? "form-control invalid"
// 		: "form-control";

// 	return (
// 		<form onSubmit={formSubmissionHandler}>
// 			<div className={nameInputClasses}>
// 				<label htmlFor="name">Your Name</label>
// 				<input
// 					//ref={nameInputRef}
// 					type="text"
// 					id="name"
// 					onChange={nameChangeHandler}
// 					onBlur={nameBlurHandler}
// 					value={enteredName}
// 				/>
// 				{nameInputHasError && <p className="error-text">name is invalid</p>}
// 			</div>
// 			<div className={emailInputClasses}>
// 				<label htmlFor="name">Your Email</label>
// 				<input
// 					//ref={nameInputRef}
// 					type="email"
// 					id="Email"
// 					onChange={emailInputChangeHandler}
// 					onBlur={emailInputBlurHandler}
// 					value={enteredEmail}
// 				/>
// 				{emailInputIsInvalid && <p className="error-text">Email is invalid</p>}
// 			</div>
// 			<div className="form-actions">
// 				<button disabled={!formIsValid}>Submit</button>
// 			</div>
// 		</form>
// 	);
// };

// export default SimpleInput;

// // CODE WITHOUT CLEANING
// import { useState } from "react";
// const SimpleInput = (props) => {
// 	//const nameInputRef = useRef();
// 	const [enteredName, setEnteredName] = useState("");
// 	const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
// 	const [enteredNameIsTouched, setEnteredNameIsTouched] = useState(false);

// 	const nameInputChangeHandler = (event) => {
// 		setEnteredName(event.target.value);

// 		if (event.target.value.trim() !== "") {
// 			setEnteredNameIsValid(true);
// 		}
// 	};

// 	const nameInputBlurHandler = (event) => {
// 		setEnteredNameIsTouched(true);

// 		if (event.target.value.trim() === "") {
// 			setEnteredNameIsValid(false);
// 		}
// 	};

// 	const formSubmissionHandler = (event) => {
// 		// the diff between using ref or state, is that for instant validation state (event.target.value) is better
// 		// but for submition validation (just once at the end) ref is a better solution
// 		event.preventDefault();
// 		setEnteredNameIsTouched(true);

// 		if (enteredName.trim() === "") {
// 			setEnteredNameIsValid(false);
// 			return;
// 		}
// 		setEnteredNameIsValid(true);
// 		console.log("state =>", enteredName);

// 		//const enteredValue = nameInputRef.current.value; //since in this example we are using state, ref is not needed
// 		//console.log("ref =>", enteredValue); //but im keeping it to have this as another reference of use

// 		setEnteredName("");
// 	};

// 	const nameInputIsInvalid = !enteredNameIsValid && enteredNameIsTouched;

// 	const nameInputClasses = nameInputIsInvalid
// 		? "form-control invalid"
// 		: "form-control";

// 	return (
// 		<form onSubmit={formSubmissionHandler}>
// 			<div className={nameInputClasses}>
// 				<label htmlFor="name">Your Name</label>
// 				<input
// 					//ref={nameInputRef}
// 					type="text"
// 					id="name"
// 					onChange={nameInputChangeHandler}
// 					onBlur={nameInputBlurHandler}
// 					value={enteredName}
// 				/>
// 				{nameInputIsInvalid && <p className="error-text">name is invalid</p>}
// 			</div>
// 			<div className="form-actions">
// 				<button>Submit</button>
// 			</div>
// 		</form>
// 	);
// };

// export default SimpleInput;
