const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	return sequelize.define("Website", {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.BIGINT,
		},
		userId: {
			allowNull: false,
			type: DataTypes.BIGINT,
		},
		title: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		email: {
			allowNull: true,
			type: DataTypes.STRING,
		},
		password: {
			allowNull: false,
			type: DataTypes.STRING,
		},
	});
};
