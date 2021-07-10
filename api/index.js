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

// test route
app.get("/", (req, res) => {
	res.send("hello world");
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server live on port ${PORT}`));
