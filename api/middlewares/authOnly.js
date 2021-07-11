const authOnly = (req, res, next) => {
	if (req.auth.isAuthenticated) next();
	else {
		res.statusCode = 401;
		res.json({ message: "you need to be logged in to make this request" });
	}
};

module.exports = authOnly;
