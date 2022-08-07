const { setData, getData, removeData } = require("../redis");
const { OTP_CONFIG } = require("../config");

const generateOTP = () => {
	try {
		const base = Math.pow(10, OTP_CONFIG.LENGTH - 1);
		const otp = Math.floor(base + Math.random() * 9 * base).toString();
		return otp;
	} catch (err) {
		console.error("[ERROR] Error while creating otp", err.message);
	}
};

const saveOTP = async (otp, userName) => {
	try {
		const key = getOTPKey(userName);
		const payload = {
			otp,
			ttl: Date.now() + OTP_CONFIG.EXPIRY,
		};
		const response = await setData(key, JSON.stringify(payload));
		return response;
	} catch (err) {
		console.error("[ERROR] OTP Generation error", err.message);
	}
};

const checkOTP = async (otp, userName) => {
	try {
		const key = getOTPKey(userName);
		let result = await getData(key);
		if (result) {
			result = JSON.parse(result);
		} else {
			return "NOT OK";
		}
		if (Date.now() > result.ttl) {
			removeData(key);
			return "EXPIRED";
		}
		if (result.otp === otp) {
			removeData(key);
			return "OK";
		} else {
			return "Not OK";
		}
	} catch (err) {
		console.error("[ERROR] OTP Verification error", err.message);
		return "NOT OK";
	}
};

const getOTPKey = (userName) => {
	return "KEY#" + userName;
};

module.exports.generateOTP = generateOTP;
module.exports.saveOTP = saveOTP;
module.exports.checkOTP = checkOTP;
