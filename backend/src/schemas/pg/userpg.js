const { DataTypes } = require("sequelize");
const { sequelize } = require("../../connections/postgres");

const Userpg = sequelize.define(
  "userpg",
  {
    mongo_user_id: {
      type: DataTypes.STRING(24),
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  },
);

module.exports = Userpg;
