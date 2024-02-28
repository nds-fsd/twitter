const { DataTypes } = require("sequelize");
const { sequelize } = require("../../connections/postgres");
const Userpg = require("./userpg");
const Chat = require("./chat");

const Message = sequelize.define(
  "message",
  {
    user: {
      type: DataTypes.STRING(24),
      allowNull: false,
      references: {
        model: Userpg,
        key: "mongo_user_id",
      },
    },
    chat: {
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
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Message;
