import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
	return (
		<>
			<h1>HomePage</h1>
			<MeetupList meetups={props.meetups} />{" "}
		</>
	);
}

export async function getStaticProps() {
	// fetch data from an API -- this is great for SEO

	const client = await MongoClient.connect(
		"mongodb+srv://admin:admin@cluster0.n5ilsr0.mongodb.net/meetups?retryWrites=true&w=majority"
	);
	const db = client.db();
	const meetupsCollection = db.collection("meetups");

	const meetups = await meetupsCollection.find().toArray();
	client.close();
	return {
		props: {
			//this are the same props you recieve in your component function
			meetups: meetups.map((meetup) => ({
				title: meetup.title,
				address: meetup.address,
				image: meetup.image,
				id: meetup._id.toString(),
			})),
		},
		revalidate: 10, //with this you update your page every X seconds of time
	};
}

// export async function getServerSideProps(context) {
// 	//this runs always on the server after deployment ALSO you can await fetch data
// 	const req = context.req; //this is used as an example: for authentication
// 	const res = context.res;
// 	return {
// 		props: {
// 			meetups: DUMMY_MEETUPS,
// 		},
// 	};
// }

export default HomePage;
