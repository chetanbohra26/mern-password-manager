const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	return sequelize.define("Website", {
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
