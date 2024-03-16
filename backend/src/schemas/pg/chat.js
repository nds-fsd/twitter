const { DataTypes } = require("sequelize");
const { sequelize } = require("../../connections/postgres");
const UserExternal = require("./user");

const Chat = sequelize.define(
  "chat_rooms",
  {
    user1: {
      type: DataTypes.STRING(24),
      allowNull: false,
      references: {
        model: UserExternal,
        key: "mongo_user_id",
      },
    },
    user2: {
      type: DataTypes.STRING(24),
      allowNull: false,
      references: {
        model: UserExternal,
        key: "mongo_user_id",
      },
    },
  },
  {
    freezeTableName: true,
  },
);

module.exports = Chat;
