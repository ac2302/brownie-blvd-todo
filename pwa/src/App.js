import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/Login";
import MainScreen from "./components/MainScreen";
import NewOrder from "./components/NewOrder";
import ViewOrder from "./components/ViewOrder";
import Page404 from "./components/Page404";

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [token, setToken] = useState();

	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		if (storedToken) {
			setIsAuthenticated(true);
			setToken(storedToken);
		}
	}, []);

	useEffect(() => {
		if (token) localStorage.setItem("token", token);
	}, [token]);

	// setting title
	document.title = "BB To-Do"

	return (
		<Router>
			<Switch>
				<Route path="/" exact={true}>
					{isAuthenticated ? (
						<MainScreen token={token} />
					) : (
						<Login
							setIsAuthenticated={setIsAuthenticated}
							setToken={setToken}
						/>
					)}
				</Route>

				{/* authenticated routes */}
				{isAuthenticated ? (
					<>
						<Route path="/new" exact={true}>
							<NewOrder token={token} />
						</Route>
						<Route path="/view/:id">
							<ViewOrder token={token} />
						</Route>
					</>
				) : (
					<Login setIsAuthenticated={setIsAuthenticated} setToken={setToken} />
				)}

				{/* 404 */}
				<Route path="*">
					<Page404 />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
