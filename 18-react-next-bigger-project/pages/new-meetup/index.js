import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function MeetupPage() {
	const router = useRouter();
	const addMeetupHandler = async (enteredMeetupData) => {
		const response = await fetch("/api/new-meetup", {
			method: "POST",
			body: JSON.stringify(enteredMeetupData),
			headers: {
				"content-type": "application/json",
			},
		});
		const data = await response.json();
		console.log(data);
		router.replace("/");
	};
	return (
		<>
			<NewMeetupForm onAddMeetup={addMeetupHandler} />
		</>
	);
}

export default MeetupPage;
