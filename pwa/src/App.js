import React, { useState, useEffect } from "react";
import Login from "./components/Login";

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	return <>{isAuthenticated ? <h1>logged in</h1> : <Login />}</>;
}

export default App;
