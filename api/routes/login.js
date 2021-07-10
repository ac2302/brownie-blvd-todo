const router = require("express").Router();

router.post("/", (req, res) => {
	if (req.auth.isAuthenticated)
		res.json({ loggedIn: true, user: req.auth.user });
	else res.json({ loggedIn: false, message: "incorrent username or password" });
});

module.exports = router;
