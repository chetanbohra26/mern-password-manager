const config = {
	DB_CONFIG: {
		dialect: "postgres",
		dialectOptions: {
			ssl: {
				rejectUnauthorized: false,
				requestCert: true,
			},
		},
		logging: undefined,
	},
	REDIS_CONFIG: {
		tls: {
			rejectUnauthorized: false,
		},
	},
	ENCRYPTION: {
		ALGORITHM: "aes-256-cbc",
		SALT_BYTES: 32,
		KEY_BYTES: 32,
		KEY_SEPARATOR: "$",
	},
	TOKEN: {
		EXPIRY: "30m",
	},
	OTP_CONFIG: {
		EXPIRY: 10 * 60 * 1000,
		LENGTH: 6,
		MAX_OTP_COUNT: 3,
		RATE_RESET_TIME: 60 * 60 * 1000,
	},
};

module.exports = config;
