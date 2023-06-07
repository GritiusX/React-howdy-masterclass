import { MongoClient } from "mongodb";
// POST /api/new-meetup

async function handler(req, res) {
	if (req.method === "POST") {
		const data = JSON.parse(req.body);

		const client = await MongoClient.connect(
			"mongodb+srv://admin:admin@cluster0.n5ilsr0.mongodb.net/meetups?retryWrites=true&w=majority"
		);
		const db = client.db();
		const meetupsCollection = db.collection("meetups");

		const result = await meetupsCollection.insertOne(data);

		console.log(result);
		client.close();

		res.status(201).json({ message: "meetup inserted successfully" });
	}
}
export default handler;
