import { Link, useSubmit } from "react-router-dom";

import classes from "./EventItem.module.css";

function EventItem({ event }) {
	const submit = useSubmit();
	function startDeleteHandler() {
		const proceed = window.confirm("Are you sure?");
		if (proceed) {
			submit(null, { method: "delete" }); //takes 2 args, the first is the data you wanna submit that would be inmmediately wrapped in a formData object, like in newEvent.js - here we need no data so we use null
			// the second argument is used to send it to the action method on eventDetailPage
		}
	}

	return (
		<article className={classes.event}>
			<img src={event.image} alt={event.title} />
			<h1>{event.title}</h1>
			<time>{event.date}</time>
			<p>{event.description}</p>
			<menu className={classes.actions}>
				<Link to="edit">Edit</Link>
				<button onClick={startDeleteHandler}>Delete</button>
			</menu>
		</article>
	);
}

export default EventItem;
