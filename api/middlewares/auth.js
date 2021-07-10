const User = require("../models/User");

module.exports = (req, res, next) => {
	if (!req.body.user) {
		// there is no user in body
		req.auth = { isAuthenticated: false };
		next();
	} else if (
		!(
			req.body.user.hasOwnProperty("username") &&
			req.body.user.hasOwnProperty("password")
		)
	) {
		// the user in body does not have all the required fields
		req.auth = { isAuthenticated: false };
		next();
	} else {
		// valid input
		// authenticating
		const { username, password } = req.body.user;

		User.findOne({ username, password }, (err, doc) => {
			if (err) res.statusCode(500).json({ err });
			else if (doc === null) req.auth = { isAuthenticated: false };
			else req.auth = { isAuthenticated: true, user: username };

			next();
		});
	}
};
