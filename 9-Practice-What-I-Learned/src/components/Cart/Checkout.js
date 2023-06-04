import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmptyValidation = (value) => value.trim() === "";
const isFiveCharsValidation = (value) => value.trim().length === 5;

const Checkout = (props) => {
	const [inputsValidity, setInputsValidity] = useState({
		name: true,
		street: true,
		postal: true,
		city: true,
	});
	const nameInputRef = useRef();
	const streetInputRef = useRef();
	const postalInputRef = useRef();
	const cityInputRef = useRef();

	const confirmHandler = (event) => {
		event.preventDefault();
		const enteredName = nameInputRef.current.value;
		const enteredStreet = streetInputRef.current.value;
		const enteredPostal = postalInputRef.current.value;
		const enteredCity = cityInputRef.current.value;

		const enteredNameIsValid = !isEmptyValidation(enteredName);
		const enteredStreetIsValid = !isEmptyValidation(enteredStreet);
		const enteredPostalIsValid = isFiveCharsValidation(enteredPostal);
		const enteredCityIsValid = !isEmptyValidation(enteredCity);

		setInputsValidity({
			name: enteredNameIsValid,
			street: enteredStreetIsValid,
			postal: enteredPostalIsValid,
			city: enteredCityIsValid,
		});

		const formIsValid =
			enteredNameIsValid &&
			enteredStreetIsValid &&
			enteredPostalIsValid &&
			enteredCityIsValid;
		if (!formIsValid) {
			return;
		}

		const userData = {
			name: enteredName,
			street: enteredStreet,
			postal: enteredPostal,
			city: enteredCity,
		};

		props.onConfirm(userData);
	};
	const nameControlClasses = `${classes.control} ${
		!inputsValidity.name ? `${classes.invalid}` : ""
	}`;
	const streetControlClasses = `${classes.control} ${
		!inputsValidity.street ? `${classes.invalid}` : ""
	}`;
	const postalControlClasses = `${classes.control} ${
		!inputsValidity.postal ? `${classes.invalid}` : ""
	}`;
	const cityControlClasses = `${classes.control} ${
		!inputsValidity.city ? `${classes.invalid}` : ""
	}`;

	return (
		<form className={classes.form} onSubmit={confirmHandler}>
			<div className={nameControlClasses}>
				<label htmlFor="name">Your Name</label>
				<input type="text" id="name" ref={nameInputRef} />
				{!inputsValidity.name && <p>Name not valid</p>}
			</div>
			<div className={streetControlClasses}>
				<label htmlFor="street">Street</label>
				<input type="text" id="street" ref={streetInputRef} />
				{!inputsValidity.street && <p>Street not valid</p>}
			</div>
			<div className={postalControlClasses}>
				<label htmlFor="postal">Postal Code</label>
				<input type="text" id="postal" ref={postalInputRef} />
				{!inputsValidity.postal && <p>Postal Code must be 5 digits</p>}
			</div>
			<div className={cityControlClasses}>
				<label htmlFor="city">City</label>
				<input type="text" id="city" ref={cityInputRef} />
				{!inputsValidity.city && <p>City not valid</p>}
			</div>
			<div className={classes.actions}>
				<button type="button" onClick={props.onCancel}>
					Cancel
				</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;
