const Redis = require("ioredis");

const { REDIS_CONFIG } = require("./config");

let redis;

const redisInit = async () => {
	try {
		redis = new Redis(process.env.REDIS_TLS_URL, REDIS_CONFIG);

		redis.on("connect", () => {
			console.log("[OK] Connected to redis");
		});

		process.on("SIGINT", () => {
			redis.disconnect(false);
			console.log("[INFO] Disconnected from redis");
			process.exit(0);
		});
	} catch (err) {
		console.error("[ERROR] Redis conenction error:", err.message);
	}
};

const setData = async (key, value) => {
	try {
		const response = await redis.set(key, value);
		return response;
	} catch (err) {
		console.error("[ERROR] Redis set-key error:", err.message);
	}
};

const getData = async (key) => {
	try {
		const response = await redis.get(key);
		return response;
	} catch (err) {
		console.error("[ERROR] Redis get-key error:", err.message);
	}
};

const removeData = async (key) => {
	try {
		const response = await redis.del(key);
		return response;
	} catch (err) {
		console.error("[ERROR] Redis delete-key error:", err.message);
	}
};

module.exports.redisInit = redisInit;
module.exports.getData = getData;
module.exports.setData = setData;
module.exports.removeData = removeData;
