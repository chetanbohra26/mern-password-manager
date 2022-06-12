const express = require("express");

const router = express.Router();

const authRouter = require("./auth");

router.use(express.json());
router.use("/auth", authRouter);

router.get("/", (req, res) => {
	res.json({ success: true, message: "Welcome to API" });
});

router.all("*", (req, res) => {
	res.status(503).json({
		success: false,
		message: "The specified endpoint does not exist.",
	});
});

module.exports = router;
