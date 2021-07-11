import React from "react";
import axios from "axios";

import config from "../config";

function NewOrder({ token }) {
	return (
		<div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					// console.log(e.target.elements.foo.value);
					const fields = e.target.elements;
					const details = {
						chocolateType: fields["cocolate-type"].value,
						dueDate: fields["due-date"].value,
						hasToBeDelivered: fields["has-to-be-delivered"].checked,
						deliveryAddress: fields["delivery-address"].value,
						nameOnCard: fields["name-on-card"].value,
						isPaidFor: fields["is-paid-for"].checked,
						paymentMethod: fields["payment-method"].value,
						paymentAmount: Number(fields["payment-amount"].value),
						quantity: Number(fields["quantity"].value),
						note: fields["note"].value,
					};
					if (details.quantity == 0 || !details.dueDate) {
						alert("missing required fields");
					} else {
						if (window.confirm("are you sure you want to submit")) {
							// submitting the form
							axios
								.post(
									`${config.backendLocation}/order`,
									{ ...details },
									{ headers: { "auth-token": token } }
								)
								.then((res) => {
									console.log(res);
								});
						}
					}
				}}
			>
				<div>
					<label htmlFor="quantity">quantity</label>
					<input
						required={true}
						type="number"
						autoComplete="off"
						name="quantity"
					/>
				</div>
				<div>
					<label htmlFor="due-date">due date</label>
					<input
						required={true}
						type="datetime-local"
						autoComplete="off"
						name="due-date"
					/>
				</div>
				<div>
					<label htmlFor="chocolate-type">chocolate type</label>
					<input autoComplete="off" name="cocolate-type" />
				</div>
				<div>
					<label htmlFor="has-to-be-delivered">delivery</label>
					<input
						type="checkbox"
						autoComplete="off"
						name="has-to-be-delivered"
					/>
				</div>
				<div>
					<label htmlFor="delivery-address">delivery address</label>
					<textarea autoComplete="off" name="delivery-address" />
				</div>
				<div>
					<label htmlFor="is-paid-for">paid</label>
					<input type="checkbox" autoComplete="off" name="is-paid-for" />
				</div>
				<div>
					<label htmlFor="payment-amount">payment amount</label>
					<input type="number" autoComplete="off" name="payment-amount" />
				</div>
				<div>
					<label htmlFor="name-on-card">name on card</label>
					<input autoComplete="off" name="name-on-card" />
				</div>
				<div>
					<label htmlFor="payment-method">payment method</label>
					<input autoComplete="off" name="payment-method" />
				</div>
				<div>
					<label htmlFor="note">notes</label>
					<textarea autoComplete="off" name="note" />
				</div>
				<input type="submit" />
			</form>
		</div>
	);
}

export default NewOrder;
