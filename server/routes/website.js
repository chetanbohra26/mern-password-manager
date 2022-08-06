const express = require("express");

const { verifyUser } = require("../middleware/user");
const { models } = require("../sequelize/models");
const { encryptPassword, decryptPassword } = require("../utils/encrypt");
const { verifyPassword } = require("../utils/hash");
const {
	addSiteSchema,
	getSiteSchema,
	updateSiteSchema,
} = require("../validations/website");

const router = express.Router();

router.post("/getSites", verifyUser, async (req, res) => {
	try {
		const { value, error } = getSiteSchema.validate(req.body);
		if (error) throw error;

		if (!req.user || !req.user.email) {
			return res
				.status(401)
				.json({ success: false, message: "User not loaded properly" });
		}

		const user = await models.User.findOne({
			where: {
				email: req.user.email,
			},
		});
		if (!user) {
			return res
				.status(404)
				.json({ success: false, message: "User not found" });
		}

		const isPassValid = await verifyPassword(
			user.password,
			value.masterPassword
		);
		if (!isPassValid) {
			return res.status(400).json({
				success: false,
				message: "Invalid master password",
			});
		}

		const sites = await models.Website.findAll({
			attributes: { exclude: "userId" },
			where: {
				userId: user.id,
			},
		});

		if (!sites || sites.length === 0) {
			return res
				.status(404)
				.json({ success: false, message: "No data found" });
		}

		const promises = [];
		sites.forEach((site) =>
			promises.push(decryptPassword(site.password, value.masterPassword))
		);

		const decryptedData = await Promise.all(promises);
		if (!decryptedData || decryptedData.length !== sites.length) {
			return res.status(500).json({
				success: false,
				message: "Error while loading passwords",
			});
		}

		for (let i = 0; i < sites.length; i++) {
			sites[i].password = decryptedData[i];
		}

		res.json({
			success: true,
			message: "Data loaded successfully",
			sites,
		});
	} catch (err) {
		console.error("[ERROR]", err.message);
		res.status(400).json({ success: false, message: err.message });
	}
});

router.post("/addSite", verifyUser, async (req, res) => {
	try {
		const { value, error } = addSiteSchema.validate(req.body);
		if (error) throw error;

		if (!req.user || !req.user.email) {
			return res
				.status(401)
				.json({ success: false, message: "User not loaded properly" });
		}

		const user = await models.User.findOne({
			where: {
				email: req.user.email,
			},
		});
		if (!user)
			return res
				.status(404)
				.json({ success: false, message: "User not found" });

		const isPassValid = await verifyPassword(
			user.password,
			value.masterPassword
		);
		if (!isPassValid) {
			return res.status(400).json({
				success: false,
				message: "Invalid master password",
			});
		}

		const encryptedPassword = await encryptPassword(
			value.password,
			value.masterPassword
		);
		if (!encryptedPassword) {
			return res
				.status(500)
				.json({ success: false, message: "Error while adding site" });
		}

		const website = await models.Website.create({
			userId: user.id,
			title: value.title,
			email: value.email,
			password: encryptedPassword,
		});

		const site = {
			id: website.id,
			title: website.title,
			email: website.email,
			password: value.password,
			updatedAt: website.updatedAt,
			createdAt: website.createdAt,
		};

		res.json({
			success: true,
			message: "Data added successfully",
			site,
		});
	} catch (err) {
		console.error("[ERROR]", err.message);
		res.status(400).json({ success: false, message: err.message });
	}
});

router.put("/updateSite/:siteId", verifyUser, async (req, res) => {
	try {
		const { value, error } = updateSiteSchema.validate(req.body);

		if (!req.user || !req.user.email)
			return res
				.status(401)
				.json({ success: false, message: "User not loaded properly" });

		const user = await models.User.findOne({
			where: {
				email: req.user.email,
			},
		});

		if (!user) {
			return res
				.status(404)
				.json({ success: false, message: "User not found" });
		}

		const isPassValid = await verifyPassword(
			user.password,
			value.masterPassword
		);
		if (!isPassValid) {
			return res.status(400).json({
				success: false,
				message: "Invalid master password",
			});
		}

		const encryptedPassword = await encryptPassword(
			value.password,
			value.masterPassword
		);
		if (!encryptedPassword) {
			return res
				.status(500)
				.json({ success: false, message: "Error while updating site" });
		}

		const payload = {
			email: value.email,
			title: value.title,
			password: encryptedPassword,
		};

		const [count] = await models.Website.update(payload, {
			where: {
				id: req.params.siteId,
				userId: user.id,
			},
		});

		if (count === 0) {
			return res.status(500).json({
				sucess: false,
				message: "Error while updating details",
			});
		}

		res.json({
			success: true,
			message: "Record updated",
		});
	} catch (err) {
		console.error("[ERROR]", err.message);
		res.status(400).json({ success: false, message: err.message });
	}
});

router.delete("/removeSite/:siteId", verifyUser, (req, res) => {
	try {
		if (!req.user || !req.user.email) {
			return res
				.status(401).json({ success: false, message: "User not loaded properly" });
		}

		const user = await models.User.findOne({
			where: {
				email: req.user.email,
			},
		});

		if (!user) {
			return res
				.status(404)
				.json({ success: false, message: "User not found" });
		}

		const [count] =  models.Website.destroy({
			where: {
				userId: user.id,
				id: req.params.id
			}
		});

		if (count === 0) {
			return res.status(404).json({ success: false, message: "Error while deleting item" });
		}

	} catch (err) {
		console.error("[ERROR]", err.message);
		res.status(400).json({ success: false, message: err.message });
	}
})

module.exports = router;
