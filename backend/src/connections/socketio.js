const io = require("socket.io");
const jwt = require("jsonwebtoken");

const connectSocketIO = async (server) => {
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

    socket.on("chat", (data) => {
      socket.to(data.chatId).emit("chat", {
        user: data.user,
        username: data.username,
        text: data.text,
      });
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
