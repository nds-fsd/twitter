const { DataTypes } = require("sequelize");
const { sequelize } = require("../connections/postgres.js");
const { Userpg } = require("../schemas/userpg.js");
const { Message } = require("../schemas/message.js");

const RoomChat = sequelize.define(
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
      // references: {
      //   model: "userpg",
      //   key: "mongo_user_id",
      // },
    },
    user2: {
      type: DataTypes.STRING(24),
      allowNull: false,
      // references: {
      //   model: "userpg",
      //   key: "mongo_user_id",
      // },
    },
  },
  {
    timestamps: false,
  }
);

// RoomChat.hasMany(Userpg, {
//   foreignKey: "userId",
//   sourceKey: "mongo_user_id",
// });

// RoomChat.hasMany(Message, {
//   foreignKey: "userId",
//   sourceKey: "mongo_user_id",
// });

// Userpg.belongsTo(RoomChat, {
//   foreignKey: "userId",
//   targetId: "mongo_user_id",
// });

// Message.belongsTo(RoomChat, {
//   foreignKey: "userId",
//   targetId: "mongo_user_id",
// });

module.exports = RoomChat;
