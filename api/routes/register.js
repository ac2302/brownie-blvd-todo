const router = require("express").Router();
const User = require("../models/User");

router.post("/", async (req, res) => {
	if (req.body.user) {
		if (req.body.user.username && req.body.user.password) {
			const { username, password } = req.body.user;
			// checking if user exists
			if (await User.findOne({ username })) {
				res.statusCode = 400;
				res.json({ message: "username is taken" });
			} else {
				const newUser = new User({ username, password });

				newUser.save((err) => {
					if (err) {
						res.status = 500;
						res.json({ message: "database error" });
					} else res.json({ created: true, created: newUser });
				});
			}
		} else {
			res.statusCode = 400;
			res.json({ message: "missing username and/or password" });
		}
	} else {
		res.statusCode = 400;
		res.json({ message: "missing user in body" });
	}
});

module.exports = router;
