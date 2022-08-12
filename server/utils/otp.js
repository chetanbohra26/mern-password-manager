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

const checkRate = async (userName) => {
	try {
		const key = getRateKey(userName);
		let data = await getData(key);
		if (data) data = JSON.parse(data);
		if (!data || Date.now() - data.firstReq > OTP_CONFIG.RATE_RESET_TIME) {
			// reset limit for first request or for a request older than limit
			data = { firstReq: Date.now(), count: 0 };
		}

		if (data.count >= OTP_CONFIG.MAX_OTP_COUNT) {
			return false;
		}

		data.count++;
		await setData(key, JSON.stringify(data));
		return true;
	} catch (err) {
		console.error("[ERROR] Rate limit error");
	}
};

const getOTPKey = (userName) => {
	return "KEY#" + userName;
};

const getRateKey = (userName) => {
	return "OTPRATE#" + userName;
};

module.exports.generateOTP = generateOTP;
module.exports.saveOTP = saveOTP;
module.exports.checkOTP = checkOTP;
module.exports.checkRate = checkRate;
