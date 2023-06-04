import { Link } from "react-router-dom";

function HomePage() {
	// const navigate = useNavigate(); //useNavigate

	// const navigateHandler = () => {
	// 	//not recommended to use
	// 	navigate("/products");
	// };
	return (
		<div>
			<h1>HomePage</h1>
			<p>
				go to <Link to="products">the list of products</Link>
			</p>
			{/* <button onClick={navigateHandler}>go to Products</button> */}
		</div>
	);
}

export default HomePage;
