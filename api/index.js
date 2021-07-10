const express = require("express");
const mongoose = require("mongoose");

const app = express();

// connecting to db
mongoose.connect(
	process.env.DB_STRING,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err) => {
		if (err) console.err(err);
		else console.log("connected to db");
	}
);

// schema
const ChocolateType = mongoose.model(
	"ChocolateType",
	new mongoose.Schema({
		name: {
			type: String,
			required: true,
		},
	})
);
const Payment = mongoose.model(
	"Payment",
	new mongoose.Schema({
		method: { type: String },
		paid: { type: Boolean },
		amount: { type: Number },
	})
);
const Order = mongoose.model(
	"Order",
	new mongoose.Schema({
		cocolateType: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "ChocolateType",
		},
		dueDate: {
			type: Date,
		},
		hasToBeDelivered: {
			type: Boolean,
		},
		nameOnCard: {
			type: String,
		},
		payment: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Payment",
		},
	})
);

// get all orders
app.get("/orders", (req, res) => {
	Order.find({}, (err, docs) => {
		if (err) res.statusCode(500).json({ err });
		else {
			res.json({ orders: docs });
		}
	});
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server live on port ${PORT}`));
