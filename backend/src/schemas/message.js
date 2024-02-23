const { DataTypes } = require("sequelize");
const { sequelize } = require("../connections/postgres.js");
const { Userpg } = require("../schemas/userpg.js");
const { RoomChat } = require("../schemas/roomChat.js");

const Message = sequelize.define(
  "message",
  {
    user: {
      type: DataTypes.STRING(24),
      allowNull: false,
      // references: {
      //   model: "userpg",
      //   key: "mongo_user_id",
      // },
    },
    roomChat: {
      type: DataTypes.STRING(24),
      allowNull: false,
      // references: {
      //   model: "chat",
      //   key: "id",
      // },
    },
    message: {
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
  }
);

// Message.hasMany(Userpg, {
//   foreignKey: "userId",
//   sourceKey: "mongo_user_id",
// });

// Message.hasMany(RoomChat, {
//   foreignKey: "userId",
//   sourceKey: "mongo_user_id",
// });

// Userpg.belongsTo(Message, {
//   foreignKey: "userId",
//   targetId: "mongo_user_id",
// });

// RoomChat.belongsTo(Message, {
//   foreignKey: "userId",
//   targetId: "mongo_user_id",
// });

module.exports = Message;
