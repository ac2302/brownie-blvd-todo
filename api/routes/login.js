const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

router.post("/", async (req, res) => {
	if (req.body.user) {
		if (req.body.user.username && req.body.user.password) {
			const { username, password } = req.body.user;
			// getting user form db
			try {
				const currentUser = await User.findOne({ username });
				if (!currentUser) {
					res.statusCode = 400;
					res.json({ message: "incorrect username or password" });
				} else {
					if (await bcrypt.compare(password, currentUser.password)) {
						if (!currentUser.isActivated) {
							res.statusCode = 400;
							res.json({
								message:
									"your account is not activated. please contact your administrator",
							});
						} else {
							// signing and sending token
							const token = jwt.sign(
								{ _id: currentUser._id },
								process.env.TOKEN_SECRET
							);
							res.header("auth-token", token);
							res.json({ loggedIn: true });
						}
					} else {
						res.statusCode = 400;
						res.json({ message: "incorrect username or password" });
					}
				}
			} catch {
				res.statusCode = 500;
				res.json({ message: "database error" });
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
