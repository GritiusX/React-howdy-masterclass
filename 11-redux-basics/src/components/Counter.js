import classes from "./Counter.module.css";
import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "../store/counterSlice";

const Counter = () => {
	const dispatch = useDispatch();
	const counter = useSelector((state) => state.counterSlice.counter);
	const show = useSelector((state) => state.counterSlice.showCounter);

	const incrementHandler = () => {
		// dispatch({ type: "increment" }); //deprecated because of createSlice + configureStore
		dispatch(counterActions.increment());
	};
	const increaseHandler = () => {
		// dispatch({ type: "increase", amount: 5 });
		dispatch(counterActions.increase(5)); // {type: UNIQUE_IDENTIFIER, payload: 5}
	};
	const decrementHandler = () => {
		// dispatch({ type: "decrement" });
		dispatch(counterActions.decrement());
	};

	const toggleCounterHandler = () => {
		// dispatch({ type: "toggle" });
		dispatch(counterActions.toggleCounter());
	};

	return (
		<main className={classes.counter}>
			<h1>Redux Counter</h1>
			{show && <div className={classes.value}>{counter}</div>}
			<div>
				<button onClick={incrementHandler}>Increment</button>
				<button onClick={increaseHandler}>Increse by 5</button>
				<button onClick={decrementHandler}>Decrement</button>
			</div>
			<button onClick={toggleCounterHandler}>Toggle Counter</button>
		</main>
	);
};

export default Counter;

// check video 237 for class components
