const crypto = require("crypto");

const { ENCRYPTION } = require("../config");

const encryptPassword = (plainText, password) => {
	try {
		if (!plainText || !password) return;
		const salt = crypto.randomBytes(ENCRYPTION.SALT_BYTES);
		const key = crypto.scryptSync(password, salt, ENCRYPTION.KEY_BYTES);

		const iv = crypto.randomBytes(16);
		const cipher = crypto.createCipheriv(ENCRYPTION.ALGORITHM, key, iv);

		const encrypted =
			cipher.update(plainText, "utf8", "base64") + cipher.final("base64");

		const result = [
			encrypted,
			salt.toString("base64"),
			iv.toString("base64"),
		].join(ENCRYPTION.KEY_SEPARATOR);
		return result;
	} catch (err) {
		console.log("[ERROR] Encryption error", err.message);
	}
};

const decryptPassword = (encryptedText, password) => {
	try {
		if (!encryptedText || !encryptPassword) return;
		const [encrypted, saltBase64, ivBase64] = encryptedText.split(
			ENCRYPTION.KEY_SEPARATOR
		);
		const iv = Buffer.from(ivBase64, "base64");
		const salt = Buffer.from(saltBase64, "base64");

		const key = crypto.scryptSync(password, salt, ENCRYPTION.KEY_BYTES);

		const decipher = crypto.createDecipheriv(ENCRYPTION.ALGORITHM, key, iv);
		const decrypted =
			decipher.update(encrypted, "base64", "utf8") +
			decipher.final("utf8");

		return decrypted;
	} catch (err) {
		console.log("[ERROR] Decryption error", err.message);
	}
};

module.exports.encryptPassword = encryptPassword;
module.exports.decryptPassword = decryptPassword;
