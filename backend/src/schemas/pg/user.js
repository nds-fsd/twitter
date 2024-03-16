const { DataTypes } = require("sequelize");
const { sequelize } = require("../../connections/postgres");

const UserExternal = sequelize.define(
  "users",
  {
    mongo_user_id: {
      type: DataTypes.STRING(24),
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  },
);

module.exports = UserExternal;
