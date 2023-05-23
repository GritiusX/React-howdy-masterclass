import React from "react";
import classes from "./Input.module.css";

// forwardRef = we put the entire component inside it, add ref to the props () and then use it to get
// the reference we need - in this case it is the ref inside the input
const Input = React.forwardRef((props, ref) => {
	return (
		<div className={classes.input}>
			<label htmlFor={props.input.id}>{props.label}</label>
			<input ref={ref} id={props.input.id} {...props.input} />
		</div>
	);
});

export default Input;
