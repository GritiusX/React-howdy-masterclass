import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import { useFetch } from "../../hooks/useFetch";

const NewTask = (props) => {
	//sendRequest takes 2 args: a) the configuration object and
	// b) a fn that takes the response data and does something with it
	const { isLoading, error, sendRequest: sendTaskRequest } = useFetch();

	const enterTaskHandler = async (taskText) => {
		const createTask = (taskData) => {
			const generatedId = taskData.name; // firebase-specific => "name" contains generated id
			const createdTask = { id: generatedId, text: taskText };
			props.onAddTask(createdTask);
		};

		sendTaskRequest(
			{
				url: "https://react-howdy-project-default-rtdb.firebaseio.com/tasks.json",
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: { text: taskText },
			},
			createTask
		);
	};

	return (
		<Section>
			<TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
			{error && <p>{error}</p>}
		</Section>
	);
};

export default NewTask;
