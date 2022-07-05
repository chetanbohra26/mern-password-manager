const Joi = require("joi");

const registerSchema = Joi.object({
	username: Joi.string()
		.required()
		.trim()
		.min(6)
		.alphanum()
		.error(() => new Error("Invalid username")),
	email: Joi.string()
		.email()
		.max(256)
		.required()
		.trim()
		.error(() => new Error("Invalid email")),
	password: Joi.string()
		.required()
		.min(6)
		.error(() => new Error("Invalid password")),
	password2: Joi.string()
		.required()
		.equal(Joi.ref("password"))
		.error(() => new Error("Passwords are not the same")),
});

const loginSchema = Joi.object({
	email: Joi.string()
		.email()
		.max(256)
		.required()
		.trim()
		.error(() => new Error("Invalid email")),
	password: Joi.string()
		.required()
		.min(6)
		.error(() => new Error("Invalid password")),
});

module.exports.registerSchema = registerSchema;
module.exports.loginSchema = loginSchema;
