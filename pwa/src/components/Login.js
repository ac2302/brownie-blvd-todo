import React from "react";
import axios from "axios";

import config from "../config";

function Login({ setIsAuthenticated, setToken }) {
	function login() {
		const username = document.getElementById("username-input").value;
		const password = document.getElementById("password-input").value;

		axios
			.post(
				`${config.backendLocation}/user/login`,
				{
					user: { username, password },
				},
				{
					validateStatus: (status) =>
						(status >= 200 && status < 300) || status === 400,
				}
			)
			.then((res) => {
				if (res.data.loggedIn) {
					setTimeout(() => alert("logged in"), 0);
					setIsAuthenticated(true);
					setToken(res.headers["auth-token"]);
				} else {
					setIsAuthenticated(false);
					setToken("");
					alert(res.data.message);
				}
			})
			.catch((err) => {
				console.error(err);
				alert(err);
			});
	}

	return (
		<div>
			<input id="username-input" placeholder="username" name="username" />
			<input
				id="password-input"
				placeholder="password"
				name="password"
				type="password"
			/>
			<button onClick={login}>Login</button>
		</div>
	);
}

export default Login;
