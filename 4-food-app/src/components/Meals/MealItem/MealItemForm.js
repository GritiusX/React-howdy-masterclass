import React, { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

function MealItemForm(props) {
	const amountInputRef = useRef(); //to use a ref on a custom component you need to add forwardRef INSIDE the child component = the custom Input
	const [amountIsValid, setAmountIsValid] = useState(true);

	const submitHandler = (event) => {
		event.preventDefault();
		const enteredAmount = Number(amountInputRef.current.value); //also can use parseInt and parseFloat

		if (enteredAmount < 1 || enteredAmount > 5) {
			setAmountIsValid(false);
			return;
		}
		props.onAddToCart(enteredAmount);
	};
	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<Input
				ref={amountInputRef}
				label="Amount"
				input={{
					id: "amount_" + props.id,
					type: "number",
					min: "1",
					max: "5",
					step: "1",
					defaultValue: "1",
				}}
			/>
			<button>+ Add</button>
			{!amountIsValid && <p>Please add a valid amount (1-5)</p>}
		</form>
	);
}

export default MealItemForm;
