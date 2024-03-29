const jwt = require("jsonwebtoken");

const { TOKEN } = require("../config");

const TOKEN_SECRET = process.env.TOKEN_SECRET;

const createToken = (payload) => {
	if (!payload) return;
	try {
		const token = jwt.sign(payload, TOKEN_SECRET, {
			expiresIn: TOKEN.EXPIRY,
		});
		return token;
	} catch (err) {
		console.error("[ERROR] Token generation error:", err.message);
	}
};

const verifyToken = (token) => {
	if (!token) return;
	try {
		const payload = jwt.verify(token, TOKEN_SECRET);
		return payload;
	} catch (err) {
		console.error("[ERROR] Token validation error:", err.message);
	}
};

module.exports.createToken = createToken;
module.exports.verifyToken = verifyToken;
