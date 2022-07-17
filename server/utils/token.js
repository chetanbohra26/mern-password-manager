const jwt = require("jsonwebtoken");
const TOKEN_SECRET = process.env.TOKEN_SECRET;

const createToken = (payload) => {
	if (!payload) return;
	try {
		return jwt.sign(payload, TOKEN_SECRET, {
			expiresIn: "30m",
		});
	} catch (err) {
		console.log("[ERROR] Token generation error:", err.message);
	}
};

const verifyToken = (token) => {
	if (!token) return;
	try {
		return jwt.verify(token, TOKEN_SECRET);
	} catch (err) {
		console.log("[ERROR] Token validation error:", err.message);
	}
};

module.exports.createToken = createToken;
module.exports.verifyToken = verifyToken;
