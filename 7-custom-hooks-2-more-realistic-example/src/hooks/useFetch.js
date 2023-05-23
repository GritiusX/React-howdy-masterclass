import { useCallback, useState } from "react";

//useCallback is applied so the fn is not recreated everythime it rerenders the component
export const useFetch = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const sendRequest = useCallback(async (requestConfig, applyData) => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(requestConfig.url, {
				method: requestConfig.method ? requestConfig.method : "GET",
				headers: requestConfig.headers ? requestConfig.headers : {},
				body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
			});

			if (!response.ok) {
				throw new Error("Request failed!");
			}

			const data = await response.json(); //it returns a JSON object of objects with the id + text:''
			applyData(data); //you send data up again with this method (either get or post)
		} catch (err) {
			setError(err.message || "Something went wrong!");
		}
		setIsLoading(false);
	}, []);
	return {
		isLoading,
		error,
		sendRequest,
	};
};
