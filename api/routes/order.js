const router = require("express").Router();
const Order = require("../models/Order");
const authOnlyMiddleware = require("../middlewares/authOnly");

router.get("/:id", authOnlyMiddleware, (req, res) => {
	Order.findById(req.params.id, (err, doc) => {
		if (err) {
			res.statusCode = 500;
			res.json({ message: "database error" });
		} else res.json({ order: doc });
	});
});

router.post("/", authOnlyMiddleware, (req, res) => {
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
			});
	});
});

module.exports = router;
