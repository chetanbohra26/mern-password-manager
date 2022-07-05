const argon2 = require("argon2");

const hashPassword = async (password) => {
	if (!password) return;

	try {
		const hash = await argon2.hash(password, {
			type: argon2.argon2id,
		});
		return hash;
	} catch (err) {
		console.log("[ERROR] Hashing error", err.message);
	}
};

const verifyPassword = async (hash, password) => {
	if (!hash) return;
	try {
		const check = await argon2.verify(hash, password);
		return check;
	} catch (err) {
		console.log("[ERROR] Hash verification error", err.message);
	}
};

module.exports.hashPassword = hashPassword;
module.exports.verifyPassword = verifyPassword;
