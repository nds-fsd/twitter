const RoomChat = require("../schemas/pg/roomChat");
const Message = require("../schemas/pg/message");

const getRoomChat = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const messages = await Message.findAll({ where: { roomChat: roomId } });
    res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const createRoomChat = async (req, res) => {
  try {
    const { user1, user2 } = req.body;

    const existingRoom = await RoomChat.findOne({
      where: {
        $or: [
          { user1: user1, user2: user2 },
          { user1: user2, user2: user1 },
        ],
      },
    });

    if (existingRoom) {
      return res
        .status(400)
        .json({ error: "A room already exists with these users" });
    }

    const newRoom = await RoomChat.create({ user1, user2 });

    res.status(201).json(newRoom);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  getRoomChat,
  createRoomChat,
};
