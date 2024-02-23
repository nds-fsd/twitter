const Userpg = require("../schemas/userpg");
const RoomChat = require("../schemas/roomChat");
const Message = require("../schemas/message");

const getRoomChat = (req, res) => {
  res.send("getRoomChat");
};

const postRoomChat = (req, res) => {
  res.send("postRoomChat");
};

const deleteRoomChat = (req, res) => {
  res.send("deleteRoomChat");
};

module.exports = {
  getRoomChat,
  postRoomChat,
  deleteRoomChat,
};
