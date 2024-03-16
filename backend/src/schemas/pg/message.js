const { DataTypes } = require("sequelize");
const { sequelize } = require("../../connections/postgres");
const UserExternal = require("./user");
const Chat = require("./chat");

const Message = sequelize.define(
  "messages",
  {
    user: {
      type: DataTypes.STRING(24),
      allowNull: false,
      references: {
        model: UserExternal,
        key: "mongo_user_id",
      },
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    chat_room: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Chat,
        key: "id",
      },
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  },
);

module.exports = Message;
