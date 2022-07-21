const express = require("express");

const { verifyUser } = require("../middleware/user");

const router = express.Router();

router.get("/verifyToken", verifyUser, (req, res) => {
	if (!req.user || !req.user.username || req.user.username === "")
		return res.json({ success: true, message: "Invalid User" });

	res.json({ success: true, message: "User token verified" });
});

module.exports = router;
