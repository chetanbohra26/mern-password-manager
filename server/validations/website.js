const Joi = require("joi");

const getSiteSchema = Joi.object({
	masterPassword: Joi.string()
		.required()
		.error(() => new Error("Invalid master password")),
});

const addSiteSchema = Joi.object({
	title: Joi.string()
		.required()
		.trim()
		.error(() => new Error("Title is missing")),
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
	masterPassword: Joi.string()
		.required()
		.error(() => new Error("Invalid master password")),
});

const updateSiteSchema = Joi.object({
	id: Joi.string()
		.optional()
		.error(() => new Error("Invalid id")),
	title: Joi.string()
		.required()
		.trim()
		.error(() => new Error("Title is missing")),
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
	masterPassword: Joi.string()
		.required()
		.error(() => new Error("Invalid master password")),
	createdAt: Joi.date().optional(() => new Error("Invalid createdAt")),
	updatedAt: Joi.date().optional(() => new Error("Invalid updatedAt")),
});

module.exports.getSiteSchema = getSiteSchema;
module.exports.addSiteSchema = addSiteSchema;
module.exports.updateSiteSchema = updateSiteSchema;
