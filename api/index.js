const express = require("express");
const mongoose = require("mongoose");

// creating app
const app = express();

// all route middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./middlewares/auth")); // for auth

// connecting to db
mongoose.connect(
	process.env.DB_STRING,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err) => {
		if (err) console.err(err);
		else console.log("connected to db");
	}
);

// schemas
const User = require("./models/User");
const Order = require("./models/Order");

// login
app.post("/login", (req, res) => {
	if (req.auth.isAuthenticated)
		res.json({ loggedIn: true, user: req.auth.user });
	else res.json({ loggedIn: false, message: "incorrent username or password" });
});

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
		else
			res.json({
				added: true,
				order: newOrder,
				auth: req.auth,
			});
	});
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server live on port ${PORT}`));
