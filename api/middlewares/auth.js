const jwt = require("jsonwebtoken");

const User = require("../models/User");

module.exports = (req, res, next) => {
	const token = req.headers["auth-token"];

	if (!token) {
		req.auth = { isAuthenticated: false };
		next();
	}

	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		req.auth = { isAuthenticated: true, user: verified._id };
		next();
	} catch {
		req.auth = { isAuthenticated: false };
		next();
	}
};
