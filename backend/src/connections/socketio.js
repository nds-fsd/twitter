const io = require("socket.io");
const jwt = require("jsonwebtoken");
const Message = require("../schemas/pg/message");
const { connectPostgresDB } = require("./postgres");

const connectSocketIO = async (server) => {
  await connectPostgresDB();

  const socketIOInstance = io(server, { cors: { origins: ["*"] } });

  socketIOInstance.use((socket, next) => {
    const token = socket.handshake.auth.token;
    try {
      const secret = process.env.JWT_SECRET;
      const tokenPayload = jwt.verify(token, secret);
      socket.userid = tokenPayload.id;
      socket.joinedRooms = new Set();
    } catch (error) {
      return next(error);
    }
    next();
  });

  socketIOInstance.on("connect", async (socket) => {
    console.log(`New client connected ${socket.id} 🚀`);

    socket.on("joinRoom", (chatId) => {
      socket.join(chatId);
    });

    socket.on("chat", async (data) => {
      try {
        const newMessage = await Message.create({
          user: data.user,
          username: data.username,
          text: data.text,
          chat: data.chat,
        });
        const chatRoom = newMessage.chat.toString();
        socket.to(chatRoom).emit("chat", {
          username: newMessage.username,
          text: newMessage.text,
          createdAt: newMessage.createdAt,
        });
      } catch (error) {
        console.error("Error saving message to database:", error);
      }
    });

    socket.on("disconnect", () => {
      for (const room of socket.joinedRooms) {
        socket.leave(room);
      }
      console.log(`Client disconnected ${socket.id}`);
    });
  });
};

module.exports = {
  connectSocketIO,
};
