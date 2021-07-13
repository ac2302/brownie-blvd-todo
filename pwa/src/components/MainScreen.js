import React, { useState, useEffect } from "react";
import axios from "axios";

import Countdown from "./Countdown";
import config from "../config";

import "../styles/MainScreen.css";

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
		<div className="order-card">
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
				{details.chocolateType} x{details.quantity}
			</a>
			<Countdown to={details.dueDate} />
		</div>
	);
}

export default MainScreen;
