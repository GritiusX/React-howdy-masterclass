import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import Card from "./Card";
import Button from "./Button";
import "./Modal.css";

// this component is different from the others because it uses react Portals from react-dom, basically we divided the component
// int 2 parts 1) Backdrop and 2) Modal Overlay - which they are passed on the Modal function inside the return, this 2 components
// go and will render in the 'backdrop-root' inside the public folder -> index.html

const Backdrop = (props) => {
	return <div className="backdrop" onClick={props.backdropErrorHandler}></div>;
};

const ModalOverlay = (props) => {
	return (
		<Card className={"modal"}>
			<header className="header">
				<h2>{props.title}</h2>
			</header>
			<div className="content">
				<p>{props.message}</p>
			</div>
			<footer className="actions">
				<Button onClick={props.modalOverlayErrorHandler}>Okay</Button>
			</footer>
		</Card>
	);
};

const Modal = (props) => {
	const errorHandler = () => {
		return props.isErrorHandler(null);
	};
	return (
		<Fragment>
			{ReactDOM.createPortal(
				<Backdrop backdropErrorHandler={errorHandler} />,
				document.getElementById("backdrop-root")
			)}
			{ReactDOM.createPortal(
				<ModalOverlay
					modalOverlayErrorHandler={errorHandler}
					title={props.title}
					message={props.message}
				/>,
				document.getElementById("backdrop-root")
			)}
		</Fragment>
	);
};

export default Modal;
