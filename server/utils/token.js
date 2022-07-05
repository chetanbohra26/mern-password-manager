const jwt = require("jsonwebtoken");
const TOKEN_SECRET = process.env.TOKEN_SECRET;

const createToken = (payload) => {
	if (!payload) return;
	try {
		const token = jwt.sign(payload, TOKEN_SECRET, {
			expiresIn: "15m",
		});
		return token;
	} catch (err) {
		console.log("[ERROR] Token generation error:", err.message);
	}
};

const verifyToken = (token) => {
	if (!token) return;
	try {
		const payload = jwt.verify(token, TOKEN_SECRET);
		return payload;
	} catch (err) {
		console.log("[ERROR] Token validation error:", err.message);
	}
};

module.exports.createToken = createToken;
module.exports.verifyToken = verifyToken;
