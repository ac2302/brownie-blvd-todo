const mongoose = require("mongoose");

module.exports = mongoose.model(
	"Order",
	new mongoose.Schema({
		chocolateType: {
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
			type: Boolean,
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
