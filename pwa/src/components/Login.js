import React from "react";
import axios from "axios";

import config from "../config"

function Login({ setIsAuthenticated }) {
	function login() {
		const username = document.getElementById("username-input").value;
		const password = document.getElementById("password-input").value;

		axios
			.post(`${config.backendLocation}/login`, {
				user: { username, password },
			})
			.then((res) => console.log({ res }))
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
