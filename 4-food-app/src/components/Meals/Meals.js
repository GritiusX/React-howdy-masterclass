import React, { Fragment } from "react";
import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";

function Meals() {
	return (
		<Fragment>
			<AvailableMeals />
			<MealsSummary />
		</Fragment>
	);
}

export default Meals;
