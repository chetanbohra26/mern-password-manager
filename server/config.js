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
};

module.exports = config;
