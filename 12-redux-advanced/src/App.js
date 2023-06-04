import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { useEffect } from "react";
import { sendCartData, fetchCartData } from "./store/cart-actions";

let isInitial = true;
function App() {
	const showCart = useSelector((state) => state.uiSlice.cartIsVisible);
	const cart = useSelector((state) => state.cartSlice);
	const notificationStatus = useSelector((state) => state.uiSlice.notification);
	const dispatch = useDispatch();

	useEffect(() => {
		// this will only be called once because you will fetch it ONLY when the GET
		// is called
		dispatch(fetchCartData());
	}, [dispatch]);

	useEffect(() => {
		if (isInitial) {
			isInitial = false;
			return;
		}
		if (cart.changed) {
			dispatch(sendCartData(cart));
		}
	}, [cart, dispatch]);

	return (
		<>
			{notificationStatus && (
				<Notification
					status={notificationStatus.status}
					title={notificationStatus.title}
					message={notificationStatus.message}
				/>
			)}
			<Layout>
				{showCart && <Cart />}
				<Products />
			</Layout>
		</>
	);
}

export default App;
