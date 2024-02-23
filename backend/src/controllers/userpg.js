const Userpg = require("../schemas/userpg");
const RoomChat = require("../schemas/roomChat");
const Message = require("../schemas/message");

const getUserpg = (req, res) => {
  res.send("getUserpg");
};

const postUserpg = (req, res) => {
  res.send("postUserpg");
};

const deleteUserpg = (req, res) => {
  res.send("deleteUserpg");
};

module.exports = {
  getUserpg,
  postUserpg,
  deleteUserpg,
};
