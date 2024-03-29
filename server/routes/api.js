const express = require("express");

const router = express.Router();

const authRouter = require("./auth");
const siteRouter = require("./website");
const userRouter = require("./user");

router.use(express.json());
router.use("/auth", authRouter);
router.use("/sites", siteRouter);
router.use("/users", userRouter);

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
