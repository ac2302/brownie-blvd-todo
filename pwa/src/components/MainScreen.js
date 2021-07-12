import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import Countdown from "./Countdown";
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
			<a href="/new">add new order</a>
			{orders.map((order) => (
				<Order details={order} key={order._id} />
			))}
		</div>
	);
}

function Order({ details }) {
	return (
		<div onClick={() => (window.location.href = `/view/${details._id}`)}>
			<span>
				{details.chocolateType} x{details.quantity} in{" "}
				<Countdown to={details.dueDate} />
			</span>
		</div>
	);
}

export default MainScreen;
