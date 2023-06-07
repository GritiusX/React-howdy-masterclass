import { MongoClient, ObjectId } from "mongodb";
import { useRouter } from "next/router";
import MeetupDetail from "../../components/meetups/MeetupDetail";
function MeetupIndexPage(props) {
	const router = useRouter();

	return (
		<>
			<MeetupDetail
				id={props.meetupData.id}
				title={props.meetupData.title}
				image={props.meetupData.image}
				address={props.meetupData.address}
				description={props.meetupData.description}
			/>
			router meetupId: {router.query.meetupId}
		</>
	);
}

// WARNING! you need the fn getStaticPaths if you use dynamic pages with getStaticProps
export async function getStaticPaths() {
	//this describes all the dynamic segment values that this page uses before pre generated
	const client = await MongoClient.connect(
		"mongodb+srv://admin:admin@cluster0.n5ilsr0.mongodb.net/meetups?retryWrites=true&w=majority"
	);
	const db = client.db();
	const meetupsCollection = db.collection("meetups");

	const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray(); //this means find {every object} but bring me {only de _id}
	client.close();

	return {
		fallback: false,
		paths: meetups.map((meetup) => ({
			params: { meetupId: meetup._id.toString() }, //with this we are generating our array of paths dynamically
		})),
	};
}
export async function getStaticProps(context) {
	//fetch data for a single meetup
	const meetupId = context.params.meetupId; //with context.params you can get the parameters in the URL such as the object id

	const client = await MongoClient.connect(
		"mongodb+srv://admin:admin@cluster0.n5ilsr0.mongodb.net/meetups?retryWrites=true&w=majority"
	);
	const db = client.db();
	const meetupsCollection = db.collection("meetups");

	const selectedMeetup = await meetupsCollection.findOne({
		_id: ObjectId(meetupId),
	});

	client.close();

	return {
		props: {
			meetupData: {
				id: selectedMeetup._id.toString(),
				title: selectedMeetup.title,
				image: selectedMeetup.image,
				address: selectedMeetup.address,
				description: selectedMeetup.description,
			},
		},
	};
}

export default MeetupIndexPage;
