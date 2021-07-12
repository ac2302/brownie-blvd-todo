import React, { useState, useEffect } from "react";
import axios from "axios";

import Countdown from "./Countdown";
import config from "../config";

function MainScreen({ token }) {
	const [orders, setOrders] = useState([]);

	function fetchOrders() {
		axios
			.get(`${config.backendLocation}/orders`, {
				headers: { "auth-token": token },
			})
			.then((res) => setOrders(res.data.orders));
	}

	useEffect(fetchOrders, [token]);
	useEffect(fetchOrders, []);

	return (
		<div>
			{orders.map((order) => (
				<Order details={order} key={order._id} />
			))}
		</div>
	);
}

function Order({ details }) {
	return (
		<div>
			<a href={`/view/${details._id}`}>
				{details.chocolateType} x{details.quantity} in{" "}
				<Countdown to={details.dueDate} />
			</a>
		</div>
	);
}

export default MainScreen;
