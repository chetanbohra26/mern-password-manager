const { Sequelize } = require("sequelize");

const { DB_CONFIG } = require("../config");
const { loadModels } = require("./models");

const sequelize = new Sequelize(process.env.DATABASE_URL, DB_CONFIG);

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
