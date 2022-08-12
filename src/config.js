const commonConfig = {
	HTTP_REQ_TIMEOUT: 10 * 1000,
};

const prodConfig = {
	apiURL: "/api",
	...commonConfig,
};
const devConfig = {
	apiURL: "http://localhost:7500/api",
	...commonConfig,
};

export const config =
	process.env.NODE_ENV === "development" ? devConfig : prodConfig;
