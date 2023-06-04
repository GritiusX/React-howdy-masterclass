import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState();

	useEffect(() => {
		const fetchMeals = async () => {
			setIsLoading(true);
			const loadedMeals = [];
			const response = await fetch(
				"https://react-howdy-project-default-rtdb.firebaseio.com/meals.json"
			);
			if (!response.ok) {
				throw new Error("Something went wrong");
			}
			const data = await response.json();

			for (const key in data) {
				loadedMeals.push({
					id: key,
					name: data[key].name,
					description: data[key].description,
					price: data[key].price,
				});
			}
			setMeals(loadedMeals);
			setIsLoading(false);
		};

		fetchMeals().catch(() => {
			setIsLoading(false);
			setHasError(true);
		});
	}, []);

	const mealsList = meals.map((meal) => (
		<MealItem
			key={meal.id}
			id={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
		/>
	));

	if (isLoading) {
		return <p className={classes.loadingMeals}>Loading...</p>;
	}

	if (hasError) {
		return (
			<section className={classes.error}>
				<p>Oops, there's been an error!</p>
			</section>
		);
	}
	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;
