import { configureStore, createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
	name: "ui",
	initialState: {
		cartIsVisible: false,
		notification: null,
	},
	reducers: {
		showCart(state) {
			state.cartIsVisible = !state.cartIsVisible;
		},
		showNotification(state, action) {
			state.notification = {
				status: action.payload.status,
				title: action.payload.title,
				message: action.payload.message,
			};
		},
	},
});

const cartInitialState = {
	itemsInCart: [],
	totalQuantity: 0,
	changed: false,
};

const cartSlice = createSlice({
	name: "cart",
	initialState: cartInitialState,
	reducers: {
		replaceCart(state, action) {
			state.totalQuantity = action.payload.totalQuantity;
			state.itemsInCart = action.payload.items;
		},
		addItemToCart(state, action) {
			const newItem = action.payload;
			const existingItem = state.itemsInCart.find(
				(item) => item.id === newItem.id
			);

			state.totalQuantity++;
			state.changed = true;

			if (!existingItem) {
				state.itemsInCart.push({
					id: newItem.id,
					price: newItem.price,
					quantity: 1,
					totalPrice: newItem.price,
					name: newItem.title,
				});
			} else {
				existingItem.quantity++;
				existingItem.totalPrice = existingItem.totalPrice + newItem.price;
			}
		},
		removeItemFromCart(state, action) {
			const itemId = action.payload;
			const existingItem = state.itemsInCart.find((item) => item.id === itemId);
			state.totalQuantity--;
			state.changed = true;

			if (existingItem.quantity === 1) {
				state.itemsInCart = state.itemsInCart.filter(
					(item) => item.id !== itemId
				);
			} else {
				existingItem.quantity--;
				existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
			}
		},
	},
});

const store = configureStore({
	reducer: {
		uiSlice: uiSlice.reducer,
		cartSlice: cartSlice.reducer,
	},
});

export const uiActions = uiSlice.actions;
export const cartActions = cartSlice.actions;

export default store;
