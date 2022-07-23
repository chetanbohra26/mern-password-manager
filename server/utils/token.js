const jwt = require("jsonwebtoken");

const { TOKEN } = require("../config");

const TOKEN_SECRET = process.env.TOKEN_SECRET;

const createToken = (payload) => {
	if (!payload) return;
	try {
		return jwt.sign(payload, TOKEN_SECRET, {
			expiresIn: TOKEN.EXPIRY,
		});
	} catch (err) {
		console.error("[ERROR] Token generation error:", err.message);
	}
};

const verifyToken = (token) => {
	if (!token) return;
	try {
		return jwt.verify(token, TOKEN_SECRET);
	} catch (err) {
		console.error("[ERROR] Token validation error:", err.message);
	}
};

module.exports.createToken = createToken;
module.exports.verifyToken = verifyToken;
