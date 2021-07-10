const router = require("express").Router();
const Order = require("../models/Order");

router.get("/", (req, res) => {
	Order.find({}, (err, docs) => {
		if (err) res.statusCode(500).json({ err });
		else {
			res.json({ orders: docs });
		}
	});
});

module.exports = router;
