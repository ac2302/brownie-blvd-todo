import React, { useState, useEffect } from "react";
import axios from "axios";

import config from "../config";

function MainScreen({ token }) {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		axios
			.get(`${config.backendLocation}/orders`, {
				headers: { "auth-token": token },
			})
			.then((res) => setOrders(res.data.orders));
	}, []);

	return (
		<div>
			{orders.map((order) => (
				<Order details={order} key={order._id} />
			))}
		</div>
	);
}

function Order({ details }) {
	const [currentTime, setCurrentTime] = useState(Date.now);

	setInterval(() => {
		setCurrentTime(Date.now());
	}, 1000);

	let seconds = (Date.parse(details.dueDate) - Date.now()) / 1000;
	seconds -= seconds % 1;
	let minuites = seconds / 60;
	minuites -= minuites % 1;
	seconds -= minuites * 60;
	let hours = minuites / 60;
	hours -= hours % 1;
	minuites -= hours * 60;
	let days = hours / 24;
	days -= days % 1;
	hours -= days * 24;

	let prettyCountdown = "";
	if (hours) prettyCountdown += `${days} days, `;
	if (hours) prettyCountdown += `${hours} hours and `;
	prettyCountdown += `${minuites} min left`;

	return (
		<div>
			<span>
				{details.chocolateType} x{details.quantity} in {prettyCountdown}
			</span>
		</div>
	);
}

export default MainScreen;
