const { setData, getData } = require("../redis");

const generateOTP = () => {
	try {
		const otp = Math.floor(100000 + Math.random() * 900000).toString();
		return otp;
	} catch (err) {
		console.error("[ERROR] Error while creating otp", err.message);
	}
};

const saveOTP = (otp, userName) => {
	try {
		const key = getOTPKey(userName);
		return setData(key, otp);
	} catch (err) {
		console.error("[ERROR] OTP Generation error", err.message);
	}
};

const checkOTP = async (otp, userName) => {
	try {
		const key = getOTPKey(userName);
		const result = await getData(key);
		if (result === otp) {
			return "OK";
		} else {
			return "Not OK";
		}
	} catch (err) {
		console.error("[ERROR] OTP Verification error", err.message);
	}
};

const getOTPKey = (userName) => {
	return "KEY#" + userName;
};

module.exports.generateOTP = generateOTP;
module.exports.saveOTP = saveOTP;
module.exports.checkOTP = checkOTP;
