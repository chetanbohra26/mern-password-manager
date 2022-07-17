const crypto = require("crypto");

const algorithm = "aes-256-cbc";

const encryptPassword = (plainText, password) => {
	try {
		if (!plainText || !password) return;
		const salt = crypto.randomBytes(32);
		const key = crypto.scryptSync(password, salt, 32);

		const iv = crypto.randomBytes(16);
		const cipher = crypto.createCipheriv(algorithm, key, iv);

		const encrypted =
			cipher.update(plainText, "utf8", "base64") + cipher.final("base64");

		const result = [
			encrypted,
			salt.toString("base64"),
			iv.toString("base64"),
		].join("$");
		return result;
	} catch (err) {
		console.log("[ERROR] Encryption error", err.message);
	}
};

const decryptPassword = (encryptedText, password) => {
	try {
		if (!encryptedText || !encryptPassword) return;
		const [encrypted, saltBase64, ivBase64] = encryptedText.split("$");
		const iv = Buffer.from(ivBase64, "base64");
		const salt = Buffer.from(saltBase64, "base64");

		const key = crypto.scryptSync(password, salt, 32);

		const decipher = crypto.createDecipheriv(algorithm, key, iv);
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
