const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	return sequelize.define("User", {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		username: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: true,
		},
		email: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: true,
		},
		password: {
			allowNull: false,
			type: DataTypes.STRING,
		},
	});
};
