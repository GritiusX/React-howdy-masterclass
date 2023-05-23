import { useState } from "react";

const useInput = (validateValue) => {
	const [enteredValue, setEnteredValue] = useState("");
	const [isTouched, setIsTouched] = useState(false);

	const valueIsValid = validateValue(enteredValue); //we recieve through props so the hooks is more generic => enteredValue.trim() !== ""; is removed
	const hasError = !valueIsValid && isTouched;

	const valueChangeHandler = (event) => {
		setEnteredValue(event.target.value);
	};

	const inputBlurHandler = (event) => {
		setIsTouched(true);
	};
	const reset = () => {
		setEnteredValue("");
		setIsTouched(false);
	};
	return {
		value: enteredValue,
		hasError,
		reset,
		isValid: valueIsValid,
		valueChangeHandler,
		inputBlurHandler,
	};
};

export default useInput;
