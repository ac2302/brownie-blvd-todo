import React, { useState, useEffect } from "react";
import Login from "./components/Login";

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [token, setToken] = useState("");

	return (
		<>
			{isAuthenticated ? (
				<h1>logged in</h1>
			) : (
				<Login setIsAuthenticated={setIsAuthenticated} setToken={setToken} />
			)}
		</>
	);
}

export default App;
