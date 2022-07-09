import axios from "axios";
import { config } from "../config";

const handleError = ({ response }) => {
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

export { loginRequest, registerRequest };
