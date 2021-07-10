const express = require("express");
const mongoose = require("mongoose");

const app = express();

// basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
const Order = mongoose.model(
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

// get all orders
app.get("/orders", (req, res) => {
	Order.find({}, (err, docs) => {
		if (err) res.statusCode(500).json({ err });
		else {
			res.json({ orders: docs });
		}
	});
});

// post an order
app.post("/order", (req, res) => {
	const {
		chocolateType,
		dueDate,
		hasToBeDelivered,
		deliveryAddress,
		nameOnCard,
		isPaidFor,
		paymentMethod,
		paymentAmount,
		quantity,
		note,
	} = req.body;

	const newOrder = new Order({
		chocolateType,
		dueDate,
		hasToBeDelivered,
		deliveryAddress,
		nameOnCard,
		isPaidFor,
		paymentMethod,
		paymentAmount,
		quantity,
		note,
	});

	newOrder.save((err) => {
		if (err) res.statusCode(500).json({ err });
		else res.json({ added: true, order: newOrder });
	});
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server live on port ${PORT}`));
