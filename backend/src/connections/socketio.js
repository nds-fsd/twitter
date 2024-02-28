const io = require("socket.io");
const jwt = require("jsonwebtoken");
// const Chat = require("../schemas/pg/chat");
// const { Op } = require("sequelize");

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

    // try {
    //   const chats = await Chat.findAll({
    //     where: {
    //       [Op.or]: [{ user1: socket.userid }, { user2: socket.userid }],
    //     },
    //   });

    //   for (const chat of chats) {
    //     const roomId = chat.id.toString();
    //     socket.join(roomId);
    //     socket.joinedRooms.add(roomId);
    //   }
    //   console.log(
    //     `Socket ${socket.id} joined rooms:`,
    //     Array.from(socket.joinedRooms)
    //   );
    // } catch (error) {
    //   console.error("Error retrieving chats:", error);
    // }

    socket.on("joinRoom", (room) => {
      socket.join(room);
    });

    socket.on("chat", (data) => {
      socket.to(data.room).emit("chat", {
        user: data.user,
        text: data.text,
      });
    });

    // // de más a más para hacer salas en tiempo real
    // socket.on("joinRoom", (room) => {
    //   socket.join(room);
    //   socketIOInstance.to(room).emit("messageWelcome", {
    //     user: "Server",
    //     body: `New client connected to room ${room} ⏲️`,
    //     chat: room,
    //   });
    // });

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
