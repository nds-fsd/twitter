const { DataTypes } = require("sequelize");
const { sequelize } = require("../../connections/postgres");
// const { RoomChat } = require("./roomChat");
// const { Message } = require("./message");

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
  }
);

// Userpg.hasMany(RoomChat, {
//   foreignKey: "userId",
//   sourceKey: "mongo_user_id",
// });

// Userpg.hasMany(Message, {
//   foreignKey: "userId",
//   sourceKey: "mongo_user_id",
// });

// RoomChat.belongsTo(Userpg, {
//   foreignKey: "userId",
//   targetId: "mongo_user_id",
// });

// Message.belongsTo(Userpg, {
//   foreignKey: "userId",
//   targetId: "mongo_user_id",
// });

module.exports = Userpg;
