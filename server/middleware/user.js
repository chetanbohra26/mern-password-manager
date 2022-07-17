const { verifyToken } = require("../utils/token");

const verifyUser = (req, res, next) => {
	const token = req.headers.token;
	if (!token)
		return res
			.status(400)
			.json({ success: false, message: "Token missing from request" });

	const decoded = verifyToken(token);
	if (!decoded)
		return res
			.status(400)
			.json({ success: false, message: "Invalid token" });
	req.user = decoded;

	next();
};

module.exports.verifyUser = verifyUser;
