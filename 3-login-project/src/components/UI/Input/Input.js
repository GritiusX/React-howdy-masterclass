import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
	//we could use forwardRef for example if I have a form and need all inputs completed, with that
	// and useImperativeHandler you can make it (video 128 - diving into Forward refs)
	return (
		<div
			className={`${classes.control} ${
				props.isValid === false ? classes.invalid : ""
			}`}
		>
			<label htmlFor={props.id}>{props.label}</label>
			<input
				type={props.type}
				id={props.id}
				value={props.value}
				onChange={props.onChange}
				onBlur={props.onBlur}
			/>
		</div>
	);
};

export default Input;
