import { uiActions } from "./index";
import { cartActions } from "./index";

export const sendCartData = (cart) => {
	//sendCartData is a fn that inmediately returns another fn that
	// it dispatches a notification action for pending, then a nested fn
	// async which sends a http request and then this same sendRequest fn
	// is recalled in the tryCatch to handle any errors and if there's no
	// errors, it dispatches success and if there's errors, it dispatches
	// the error catch
	return async (dispatch) => {
		dispatch(
			uiActions.showNotification({
				status: "pending",
				title: "Sending",
				message: "sending cart data",
			})
		);

		const sendRequest = async () => {
			const response = await fetch(
				"https://react-howdy-project-default-rtdb.firebaseio.com/cart.json",
				{
					method: "PUT",
					body: JSON.stringify({
						items: cart.itemsInCart,
						totalQuantity: cart.totalQuantity,
					}),
				}
			);
			if (!response.ok) {
				throw new Error("Sending cart data failed");
			}
		};
		try {
			await sendRequest();
			dispatch(
				uiActions.showNotification({
					status: "success",
					title: "Success",
					message: "Sent cart data successfully!",
				})
			);
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					status: "error",
					title: "Error",
					message: "Cart data failed to be sent!!",
				})
			);
		}
	};
};

export const fetchCartData = () => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await fetch(
				"https://react-howdy-project-default-rtdb.firebaseio.com/cart.json"
			);

			if (!response.ok) {
				throw new Error("Could not fetch cart data");
			}

			const data = await response.json();
			return data;
		};
		try {
			const cartData = await fetchData();
			dispatch(
				cartActions.replaceCart({
					items: cartData.items || [],
					totalQuantity: cartData.totalQuantity,
				})
			);
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					status: "error",
					title: "Error",
					message: "Fetching CART DATA failed!! ",
				})
			);
		}
	};
};
