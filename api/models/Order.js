const mongoose = require("mongoose");

module.exports = mongoose.model(
	"Order",
	new mongoose.Schema({
		cocolateType: {
			type: String,
		},
		dueDate: {
			type: Date,
		},
		hasToBeDelivered: {
			type: Boolean,
		},
		deliveryAddress: {
			type: String,
		},
		nameOnCard: {
			type: String,
		},
		isPaidFor: {
			type: String,
		},
		paymentMethod: {
			type: String,
		},
		paymentAmount: {
			type: Number,
		},
		quantity: {
			type: Number,
		},
		note: {
			type: String,
		},
	})
);
