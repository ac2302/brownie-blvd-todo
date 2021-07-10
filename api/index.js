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

// schemas
const User = mongoose.model(
	"User",
	new mongoose.Schema({
		username: {
			type: String,
		},
		password: {
			type: String,
		},
	})
);
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

// basic authentication middleware
app.use((req, res, next) => {
	if (!req.body.user) {
		// there is no user in body
		req.auth = { isAuthenticated: false };
		next();
	} else if (
		!(
			req.body.user.hasOwnProperty("username") &&
			req.body.user.hasOwnProperty("password")
		)
	) {
		// the user in body does not have all the required fields
		req.auth = { isAuthenticated: false };
		next();
	} else {
		// valid input
		// authenticating
		const { username, password } = req.body.user;

		User.findOne({ username, password }, (err, doc) => {
			if (err) res.statusCode(500).json({ err });
			else if (doc === null) req.auth = { isAuthenticated: false };
			else req.auth = { isAuthenticated: true, user: username };

			next();
		});
	}
});

// login
app.post("/login", (req, res) => {
	if (req.auth.isAuthenticated)
		res.json({ loggedIn: true, user: req.auth.user });
	else res.json({loggedIn: false, message: "incorrent username or password"});
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
