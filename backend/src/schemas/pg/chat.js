const { DataTypes } = require("sequelize");
const { sequelize } = require("../../connections/postgres");
const Userpg = require("./userpg");

const Chat = sequelize.define(
  "chat",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user1: {
      type: DataTypes.STRING(24),
      allowNull: false,
      references: {
        model: Userpg,
        key: "mongo_user_id",
      },
    },
    user2: {
      type: DataTypes.STRING(24),
      allowNull: false,
      references: {
        model: Userpg,
        key: "mongo_user_id",
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  },
);

module.exports = Chat;
