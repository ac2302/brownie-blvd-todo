const router = require("express").Router();
const Order = require("../models/Order");

router.get("/", require("../middlewares/authOnly"), (req, res) => {
	Order.find({}, null, {sort: {dueDate: 1}}, (err, docs) => {
		if (err) res.statusCode(500).json({ err });
		else {
			res.json({ orders: docs });
		}
	});
});

module.exports = router;
