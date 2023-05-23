import useInput from "../hooks/use-input";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");
const BasicForm = () => {
	// // ==== NAME INPUT
	const {
		value: enteredName,
		hasError: nameInputIsInvalid,
		reset: resetNameHandler,
		isValid: enteredNameIsValid,
		valueChangeHandler: nameChangeHandler,
		inputBlurHandler: nameBlurHandler,
	} = useInput(isNotEmpty);
	//const [enteredName, setEnteredName] = useState("");
	//const nameInputIsInvalid = !enteredNameIsValid && wasTouched;
	// const [wasTouched, setWasTouched] = useState(false);
	//const enteredNameIsValid = enteredName.trim() !== "";
	// const nameChangeHandler = (event) => {
	// 	setEnteredName(event.target.value);
	// };
	// const nameBlurHandler = () => {
	// 	setWasTouched(true);
	// };
	const nameInputClasses = nameInputIsInvalid
		? "form-control invalid"
		: "form-control";

	// // ==== LAST NAME INPUT
	const {
		value: enteredLastName,
		hasError: lastNameInputIsInvalid,
		reset: resetLastNameHandler,
		isValid: lastNameIsValid,
		valueChangeHandler: lastNameOnChangeHandler,
		inputBlurHandler: lastNameOnBlurHandler,
	} = useInput(isNotEmpty);
	// const [enteredLastName, setEnteredLastName] = useState("");
	// const [lastNameWasTouched, setLastNameWasTouched] = useState(false);
	// const lastNameIsValid = enteredLastName !== "";
	// const lastNameInputIsInvalid = !lastNameIsValid && lastNameWasTouched;
	// const lastNameOnChangeHandler = (event) => {
	// 	setEnteredLastName(event.target.value);
	// };
	// const lastNameOnBlurHandler = () => {
	// 	setLastNameWasTouched(true);
	// };
	const lastNameClasses = lastNameInputIsInvalid
		? "form-control invalid"
		: "form-control";

	// // ==== EMAIL INPUT
	const {
		value: enteredEmail,
		hasError: emailInputIsInvalid,
		reset: resetEmailHandler,
		isValid: emailInputIsValid,
		valueChangeHandler: emailOnChangeHandler,
		inputBlurHandler: emailOnBlurHandler,
	} = useInput(isEmail);
	// const [enteredEmail, setEnteredEmail] = useState("");
	// const [enteredEmailWasTouched, setEnteredEmailWasTouched] = useState(false);
	// const emailInputIsValid = enteredEmail.includes("@");
	// const emailInputIsInvalid = !emailInputIsValid && enteredEmailWasTouched;
	const emailClasses = emailInputIsInvalid
		? "form-control invalid"
		: "form-control";

	// const emailOnChangeHandler = (event) => {
	// setEnteredEmail(event.target.value);
	// };
	// const emailOnBlurHandler = () => {
	// setEnteredEmailWasTouched(true);
	// };

	// // ==== FORM HANDLER
	let formIsValid = false;

	if (enteredNameIsValid && lastNameIsValid && emailInputIsValid) {
		formIsValid = true;
	}

	const formSubmitHandler = (event) => {
		event.preventDefault();
		nameBlurHandler(true);

		if (!enteredNameIsValid) {
			return;
		}

		console.log("submited", enteredName.trim());
		resetNameHandler();
		resetLastNameHandler();
		resetEmailHandler();
	};
	return (
		<form onSubmit={formSubmitHandler}>
			<div className="control-group">
				<div className={nameInputClasses}>
					<label htmlFor="input-name">First Name</label>
					<input
						type="text"
						id="input-name"
						onChange={nameChangeHandler}
						onBlur={nameBlurHandler}
						value={enteredName}
					/>
					{nameInputIsInvalid && <p className="error-text">name is Valid</p>}
				</div>
				<div className={lastNameClasses}>
					<label htmlFor="input-last-name">Last Name</label>
					<input
						type="text"
						id="input-last-name"
						onChange={lastNameOnChangeHandler}
						onBlur={lastNameOnBlurHandler}
						value={enteredLastName}
					/>
					{lastNameInputIsInvalid && (
						<p className="error-text">last name inValid</p>
					)}
				</div>
			</div>
			<div className={emailClasses}>
				<label htmlFor="input-email">E-Mail Address</label>
				<input
					type="text"
					id="input-email"
					onChange={emailOnChangeHandler}
					onBlur={emailOnBlurHandler}
					value={enteredEmail}
				/>
				{emailInputIsInvalid && <p className="error-text">email inValid</p>}
			</div>
			<div className="form-actions">
				<button disabled={!formIsValid}>Submit</button>
			</div>
		</form>
	);
};

export default BasicForm;
