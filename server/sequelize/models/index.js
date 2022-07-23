const modelSource = [require("./user"), require("./website")];
let models = {};
const loadModels = async (sequelize) => {
	await modelSource.forEach(async (model) => {
		const Model = model(sequelize);
		Model.sync({ alter: true })
			.then(() => {
				models[Model.name] = Model;
				console.log("[INFO] Loaded model:", Model.name);
			})
			.catch((err) =>
				console.error(
					"[ERROR] Error loading model:",
					Model ? Model.name : "unknown",
					err.message
				)
			);
	});
};

module.exports.loadModels = loadModels;
module.exports.models = models;
