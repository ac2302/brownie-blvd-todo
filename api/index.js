const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// creating app
const app = express();

// all route middlewares
app.use(cors({ exposedHeaders: "auth-token" }));
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
app.use("/user/login", require("./routes/login"));

// register
app.use("/user/register", require("./routes/register"));

// get all orders
app.use("/orders", require("./routes/orders"));

// post an order
app.use("/order", require("./routes/order"));

// listen for connections
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server live on port ${PORT}`));
