const Userpg = require("../schemas/userpg");
const RoomChat = require("../schemas/roomChat");
const Message = require("../schemas/message");

const getMessage = (req, res) => {
  res.send("getMessage");
};

const postMessage = (req, res) => {
  res.send("postMessage");
};

const deleteMessage = (req, res) => {
  res.send("deleteMessage");
};

module.exports = {
  getMessage,
  postMessage,
  deleteMessage,
};
