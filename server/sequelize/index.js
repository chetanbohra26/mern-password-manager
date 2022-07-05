const { Sequelize } = require("sequelize");
const { loadModels } = require("./models");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
	dialect: "postgres",
	dialectOptions: {
		ssl: {
			rejectUnauthorized: false,
			requestCert: true,
		},
	},
	logging: undefined,
});

const init = async () => {
	try {
		await sequelize.authenticate();
		console.log("[OK] Connected to db");
		await loadModels(sequelize);
	} catch (error) {
		console.error("[ERROR] Could not connect to db:", error.message);
	}
};

module.exports.sequelize = sequelize;
module.exports.init = init;
module.exports.models = sequelize.models;
