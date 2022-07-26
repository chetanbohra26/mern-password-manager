const express = require("express");

const { verifyUser } = require("../middleware/user");
const { sendMail } = require("../utils/mail");
const { generateOTP, checkOTP, saveOTP } = require("../utils/otp");
const { models } = require("../sequelize/models");
const { createToken } = require("../utils/token");

const router = express.Router();

router.get("/verifyToken", verifyUser, (req, res) => {
	if (!req.user || !req.user.username || req.user.username === "") {
		return res.json({ success: true, message: "Invalid User" });
	}

	res.json({ success: true, message: "User token verified" });
});

router.get("/sendMailOTP", verifyUser, async (req, res) => {
	const otp = generateOTP();
	if (!otp) {
		return res
			.status(500)
			.json({ success: false, message: "Error while generating OTP" });
	}

	const result = await saveOTP(otp, req.user.username);
	if (result !== "OK") {
		return res
			.status(500)
			.json({ success: false, message: "Try again later" });
	}

	const { requestId } = await sendMail(
		req.user.email,
		"Password Pro: Confirm OTP",
		`The OTP for email verification: ${otp}`
	);
	console.log(requestId);
	if (!requestId) {
		console.warn("[Error] Email not sent possibly");
	}

	res.json({
		success: true,
		message: "Kindly check inbox or spam for OTP",
		otp,
	});
});

router.post("/confirmOTP", verifyUser, async (req, res) => {
	const otp = req.body && req.body.otp;
	if (!otp) {
		return res.status(400).json({ success: false, message: "OTP missing" });
	}

	const otpResult = await checkOTP(otp, req.user.username);
	if (!otpResult) {
		return res
			.status(500)
			.json({ success: false, message: "Error while verifying OTP" });
	}
	if (otpResult !== "OK") {
		return res.status(400).json({ success: false, message: "Invalid OTP" });
	}

	const [count] = await models.User.update(
		{ isVerified: true },
		{ where: { username: req.user.username } }
	);
	if (count === 0) {
		return res
			.status(500)
			.json({ sucess: false, message: "Error while updating details" });
	}

	// For mysql updated object is not returned in response even after passing options. Thus fetching data for consistency
	const updatedUser = await models.User.findOne({
		where: { username: req.user.username },
	});

	if (!updatedUser || !updatedUser.isVerified) {
		return res
			.status(500)
			.json({ success: false, message: "Error while updating details" });
	}

	const payload = {
		username: updatedUser.username,
		email: updatedUser.email,
		isVerified: updatedUser.isVerified,
	};
	const token = createToken(payload);
	if (!token) {
		return res.status(500).json({
			success: false,
			message: "Error while generating token",
		});
	}

	res.json({
		success: true,
		message: "OTP verified successfully",
		token,
	});
});

module.exports = router;
