import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { FaExclamationTriangle, FaTruck, FaRupeeSign } from "react-icons/fa";

import Countdown from "./Countdown";
import config from "../config";

import "../styles/ViewOrder.css";

function ViewOrder({ token }) {
	const { id } = useParams();
	const [details, setDetails] = useState({});

	const isDue = Date.parse(details.dueDate) - Date.now() < 0;

	useEffect(() => {
		axios
			.get(`${config.backendLocation}/order/${id}`, {
				headers: { "auth-token": token },
			})
			.then((res) => setDetails(res.data.order));
	}, [id]);

	function deleteOrder() {
		if (
			window.confirm(
				"Are you sure you want to mark this order as completed? This action cannot be undone."
			)
		)
			axios
				.delete(`${config.backendLocation}/order/${id}`, {
					headers: { "auth-token": token },
				})
				.then((res) => {
					console.log(res);
					window.location.href = "/";
				});
	}

	return (
		<div>
			<div className="details-card overview-card">
				<div className="icons">
					{isDue ? <FaExclamationTriangle className="icon due" /> : null}
					{details.isPaidFor ? <FaRupeeSign className="icon paid" /> : null}
					{details.hasToBeDelivered ? (
						<FaTruck className="icon delivery" />
					) : null}
				</div>
				<button onClick={deleteOrder}>mark as done</button>
			</div>
			<div className="details-card main-card">
				<h1>
					{details.chocolateType} x{details.quantity}
				</h1>
				<div className="due-date">
					{new Date(details.dueDate).toLocaleDateString()}{" "}
					{new Date(details.dueDate).toLocaleTimeString()}
				</div>
				<div className="countdown">
					<Countdown to={details.dueDate} />
				</div>
			</div>
			{/* delivery details */}

			{details.hasToBeDelivered ? (
				<div className="details-card delivery-card">
					address:{" "}
					<pre>
						{details.deliveryAddress ? details.deliveryAddress : "missing"}
					</pre>
				</div>
			) : null}
			{/* payment details */}
			<div className="details-card payment-card">
				{details.isPaidFor ? <div>paid</div> : null}
				<div>
					payment amount:{" "}
					{details.paymentAmount ? details.paymentAmount + "₹" : "missing"}
				</div>
				<div>
					payment method:{" "}
					{details.paymentMethod ? details.paymentMethod : "missing"}
				</div>
				<div>
					name on card: {details.nameOnCard ? details.nameOnCard : "missing"}
				</div>
			</div>
			{/* note */}
			{details.note ? (
				<div className="details-card note-card">
					notes:
					<pre>{details.note}</pre>
				</div>
			) : null}
		</div>
	);
}

export default ViewOrder;
