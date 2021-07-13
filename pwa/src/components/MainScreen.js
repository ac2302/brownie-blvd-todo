import React, { useState, useEffect } from "react";
import axios from "axios";

import { FaExclamationTriangle, FaTruck, FaRupeeSign } from "react-icons/fa";

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
		<div>
			{orders.map((order) => (
				<Order details={order} key={order._id} />
			))}
		</div>
	);
}

function Order({ details }) {
	const isDue = Date.parse(details.dueDate) - Date.now() < 0;

	return (
		<div className="order-card">
			<a href={`/view/${details._id}`}>
				{details.chocolateType} x{details.quantity}
			</a>
			<Countdown to={details.dueDate} />
			<div className="icons">
				{isDue ? <FaExclamationTriangle className="icon due" /> : null}
				{details.isPaidFor ? <FaRupeeSign className="icon paid" /> : null}
				{details.hasToBeDelivered ? (
					<FaTruck className="icon delivery" />
				) : null}
			</div>
		</div>
	);
}

export default MainScreen;
