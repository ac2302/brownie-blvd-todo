import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import config from "../config";

function ViewOrder({ token }) {
	const { id } = useParams();
	const [details, setDetails] = useState({});

	useEffect(() => {
		axios
			.get(`${config.backendLocation}/orders`, {
				headers: { "auth-token": token },
			})
			.then((res) => console.log(res));
	}, [id]);

	return (
		<div>
			<h1>view order</h1>
		</div>
	);
}

export default ViewOrder;
