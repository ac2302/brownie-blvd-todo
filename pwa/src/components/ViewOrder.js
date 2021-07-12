import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Countdown from "./Countdown";
import config from "../config";

function ViewOrder({ token }) {
	const { id } = useParams();
	const [details, setDetails] = useState({});

	useEffect(() => {
		axios
			.get(`${config.backendLocation}/order/${id}`, {
				headers: { "auth-token": token },
			})
			.then((res) => setDetails(res.data.order));
	}, [id]);

	return (
		<div>
			<a href="/">back to list</a>

			<h1>
				{details.chocolateType} x{details.quantity}{" "}
				{details.hasToBeDelivered ? "+delivery" : null}
			</h1>
			<h2>{Date(details.dueDate)}</h2>
			<h3>
				<Countdown to={details.dueDate} />
			</h3>
			{/* delivery details */}
			{details.hasToBeDelivered ? (
				<div>
					address:{" "}
					<pre>
						{details.deliveryAddress ? details.deliveryAddress : "missing"}
					</pre>
				</div>
			) : null}
			{/* payment details */}
			<div>
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
				<div>
					notes:
					<pre>{details.note}</pre>
				</div>
			) : null}
		</div>
	);
}

export default ViewOrder;
