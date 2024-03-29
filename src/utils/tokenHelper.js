import jwtDecode from "jwt-decode";

const getToken = () => {
	return localStorage.getItem("token");
};

const setToken = (token) => {
	localStorage.setItem("token", token);
};

const removeToken = () => {
	localStorage.removeItem("token");
};

const getPayload = () => {
	const token = getToken();
	if (!token) return;

	try {
		return jwtDecode(token);
	} catch (err) {
		console.error("Invalid token stored");
		removeToken();
		return;
	}
};

export { getToken, setToken, removeToken, getPayload };
