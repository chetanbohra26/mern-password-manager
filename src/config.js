const prodConfig = {
	apiURL: "/api",
};
const devConfig = {
	apiURL: "http://localhost:7500/api",
};

export const config =
	process.env.NODE_ENV === "development" ? devConfig : prodConfig;
