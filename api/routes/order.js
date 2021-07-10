const router = require("express").Router();
const Order = require("../models/Order");

router.post("/", (req, res) => {
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

module.exports = router;
