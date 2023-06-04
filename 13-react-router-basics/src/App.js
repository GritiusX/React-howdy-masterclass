import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import ProductsPage from "./pages/Products";
import ProductsDetailPage from "./pages/ProductDetail";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <HomePage /> }, // if you dont add the / => then is relative path
			{ path: "products", element: <ProductsPage /> }, // and relative path goes inmediately after
			{ path: "products/:productId", element: <ProductsDetailPage /> }, // the main path (<RootLayout/> path)
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
