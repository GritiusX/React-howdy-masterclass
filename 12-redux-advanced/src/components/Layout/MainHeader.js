import CartButton from "../Cart/CartButton";
import classes from "./MainHeader.module.css";

import { useDispatch } from "react-redux";
import { uiActions } from "../../store";

const MainHeader = (props) => {
	const dispatch = useDispatch();

	const toggleCartHandler = () => {
		// this handler could go inside the CartButton but I
		// prefered to send it through props just to keep practicing
		dispatch(uiActions.showCart());
	};
	return (
		<header className={classes.header}>
			<h1>ReduxCart</h1>
			<nav>
				<ul>
					<li>
						<CartButton onClick={toggleCartHandler} />
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default MainHeader;
