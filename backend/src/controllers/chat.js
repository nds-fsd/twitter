const Chat = require("../schemas/pg/chat");
const Message = require("../schemas/pg/message");
const { Op } = require("sequelize");

const getChat = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const messages = await Message.findAll({ where: { chat: chatId } });
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const getUserChat = async (req, res) => {
  try {
    const userId = req.params.userId;
    const chats = await Chat.findAll({
      where: {
        [Op.or]: [{ user1: userId }, { user2: userId }],
      },
    });
    res.json(chats);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const createChat = async (req, res) => {
  try {
    const { user1, user2 } = req.body;
    const existingChat = await Chat.findOne({
      where: {
        [Op.or]: [
          {
            user1: user1,
            user2: user2,
          },
          {
            user1: user2,
            user2: user1,
          },
        ],
      },
    });

    if (existingChat) {
      return res.status(200).json(existingChat);
    }

    const newChat = await Chat.create({ user1, user2 });

    res.status(201).json(newChat);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getChat,
  getUserChat,
  createChat,
};
