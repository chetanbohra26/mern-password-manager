const express = require("express");

const router = express.Router();

router.all("/login", (req, res) => {
	res.json({ success: true, message: "Login success" });
});

module.exports = router;
