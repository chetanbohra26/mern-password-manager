import axios from "axios";

import { config } from "../config";
import { getToken } from "../utils/tokenHelper";

const handleError = ({ response }) => {
	response.data.status = response.status;
	return (
		response?.data || { success: false, message: "Unable to get response" }
	);
};

const httpCall = async (httpConfig) => {
	try {
		const response = await axios(httpConfig);
		return response.data;
	} catch (err) {
		return handleError(err);
	}
};

const loginRequest = (email, password) => {
	const httpConf = {
		method: "post",
		url: `${config.apiURL}/auth/login`,
		data: {
			email,
			password,
		},
	};

	return httpCall(httpConf);
};

const registerRequest = (username, email, password, password2) => {
	const httpConf = {
		method: "post",
		url: `${config.apiURL}/auth/register`,
		data: {
			username,
			email,
			password,
			password2,
		},
	};

	return httpCall(httpConf);
};

const getSitesRequest = (masterPassword) => {
	const token = getToken();
	const httpConf = {
		method: "post",
		url: `${config.apiURL}/sites/getSites`,
		headers: {
			token,
		},
		data: {
			masterPassword,
		},
	};

	return httpCall(httpConf);
};

const addSiteRequest = (title, email, password, masterPassword) => {
	const token = getToken();
	const httpConf = {
		method: "post",
		url: `${config.apiURL}/sites/addSite`,
		headers: { token },
		data: {
			title,
			email,
			password,
			masterPassword,
		},
	};

	return httpCall(httpConf);
};

const verifyTokenRequest = () => {
	const token = getToken();
	const httpConf = {
		url: `${config.apiURL}/users/verifyToken`,
		method: "get",
		headers: { token },
	};

	return httpCall(httpConf);
};

const sendMailOTPRequest = () => {
	const token = getToken();
	const httpConf = {
		url: `${config.apiURL}/users/sendMailOTP`,
		method: "get",
		headers: { token },
	};

	return httpCall(httpConf);
};

const confirmOTPRequest = (otp) => {
	const token = getToken();

	const httpConf = {
		url: `${config.apiURL}/users/confirmOTP`,
		method: "post",
		headers: { token },
		data: {
			otp,
		},
	};

	return httpCall(httpConf);
};

export {
	loginRequest,
	registerRequest,
	getSitesRequest,
	addSiteRequest,
	verifyTokenRequest,
	sendMailOTPRequest,
	confirmOTPRequest,
};
