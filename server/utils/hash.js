const argon2 = require("argon2");

const hashPassword = (password) => {
	if (!password) return;

	try {
		return argon2.hash(password, {
			type: argon2.argon2id,
		});
	} catch (err) {
		console.log("[ERROR] Hashing error", err.message);
	}
};

const verifyPassword = (hash, password) => {
	if (!hash || !password) return;
	try {
		return argon2.verify(hash, password);
	} catch (err) {
		console.log("[ERROR] Hash verification error", err.message);
	}
};

module.exports.hashPassword = hashPassword;
module.exports.verifyPassword = verifyPassword;
