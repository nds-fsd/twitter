const Message = require("../schemas/pg/message");

const getMessage = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const messages = await Message.findAll({ where: { chat: chatId } });
    res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const postMessage = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const { user, username, text } = req.body;
    const newMessage = await Message.create({
      user,
      username,
      chat: chatId,
      text,
    });
    res.status(201).json(newMessage);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

module.exports = {
  getMessage,
  postMessage,
};
