import { configureStore } from "@reduxjs/toolkit";

import counterSlice from "./counterSlice";
import authSlice from "./authSlice";

const store = configureStore({
	reducer: {
		counterSlice: counterSlice.reducer,
		authSlice: authSlice.reducer,
	},
});
//const store = createStore(counterSlice.reducer); //deprecated because configureStore

export default store;

// // THIS WAS DEPRECATED BECAUSE OF CREATESLICE
// const counterReducer = (state = initialState, action) => {
// 	if (action.type === "increment") {
// 		return { counter: state.counter + 1, showCounter: state.showCounter };
// 	}
// 	if (action.type === "increase") {
// 		return {
// 			counter: state.counter + action.amount,
// 			showCounter: state.showCounter,
// 		};
// 	}
// 	if (action.type === "decrement") {
// 		return {
// 			counter: state.counter - 1,
// 			showCounter: state.showCounter,
// 		};
// 	}
// 	if (action.type === "toggle") {
// 		return {
// 			showCounter: !state.showCounter,
// 			counter: state.counter,
// 		};
// 	}
// 	return state;
// };
