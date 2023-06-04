import { Suspense } from "react";
import { useLoaderData, json, defer, Await } from "react-router-dom";

import EventsList from "../components/EventsList";

function EventsPage() {
	const { events } = useLoaderData();

	return (
		<Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
			<Await resolve={events}>
				{(loadedEvents) => <EventsList events={loadedEvents} />}
			</Await>
		</Suspense>
	);
}

export default EventsPage;

async function loadEvents() {
	const response = await fetch("http://localhost:8080/events");

	if (!response.ok) {
		// return { isError: true, message: 'Could not fetch events.' };
		// throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
		//   status: 500,
		// });
		throw json(
			{ message: "Could not fetch events." },
			{
				status: 500,
			}
		);
	} else {
		const resData = await response.json();
		return resData.events;
	}
}

export function loader() {
	return defer({
		events: loadEvents(), //this is used to let the page load even though there's a promise waiting to be resolved
	});
}

// OLD EXAMPLE --- HOW IT STARTED SECTION 20
// import { Link } from "react-router-dom";

// const EVENTS = [
// 	{ id: "e1", title: "Event 1" },
// 	{ id: "e2", title: "Event 2" },
// 	{ id: "e3", title: "Event 3" },
// 	{ id: "e4", title: "Event 4" },
// ];

// function EventsPage() {
// 	return (
// 		<>
// 			<ul>
// 				{EVENTS.map((event) => (
// 					<li key={event.id}>
// 						<Link to={event.id}>{event.title}</Link>
// 					</li>
// 				))}
// 			</ul>
// 		</>
// 	);
// }

// export default EventsPage;
