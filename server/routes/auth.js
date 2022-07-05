const express = require("express");

const { models } = require("../sequelize/models");
const { hashPassword, verifyPassword } = require("../utils/hash");
const { registerSchema, loginSchema } = require("../validations/auth");

const router = express.Router();

router.post("/register", async (req, res) => {
	try {
		const { value, error } = registerSchema.validate(req.body);
		if (error) throw error;

		const hash = await hashPassword(value.password);
		if (!hash)
			return res.status(500).json({
				success: false,
				message: "Error when registering user",
			});
		value.password = hash;

		const user = await models.User.create(value);

		res.json({
			success: true,
			message: "Registration Successfull",
		});
	} catch (err) {
		console.log("Error:", err);
		if (err.errors && err.errors.length >= 0) {
			return res
				.status(400)
				.json({ success: false, message: err.errors[0].message });
		}
		res.status(400).json({ success: false, message: err.message });
	}
});

router.post("/login", async (req, res) => {
	try {
		const { value, error } = loginSchema.validate(req.body);

		const user = await models.User.findOne({
			where: {
				email: value.email,
			},
		});

		if (!user)
			return res
				.status(404)
				.json({ success: false, message: "Invalid email or password" });

		const validPass = await verifyPassword(user.password, value.password);
		if (!validPass)
			return res
				.status(404)
				.json({ success: false, message: "Invalid email or password" });

		res.json({ success: true, message: "Login Successfull" });
	} catch (err) {}
});

module.exports = router;
