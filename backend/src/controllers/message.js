const Userpg = require("../schemas/pg/userpg");
const RoomChat = require("../schemas/pg/roomChat");
const { Message } = require("../schemas/pg/message");

const getMessage = async(req, res) => {
  try {
    const roomId = req.params.roomId;
    const messages = await Message.findAll({ where: { roomChat: roomId } });
    res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const postMessage = async (req, res) => {
  try {
    const { user, roomChat, text } = req.body;
    const newMessage = await Message.create({ user, roomChat, message: text });
    res.status(201).json(newMessage);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  getMessage,
  postMessage,
};
