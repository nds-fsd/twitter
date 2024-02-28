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
    } catch (error) {
      return next(error);
    }
    next();
  });

  socketIOInstance.on("connection", (socket) => {
    console.log(`New client connected ${socket.id} 🚀`);
    console.log("userid", socket.userid);
    // petición a la bbdd de todos los ID
    // foreach para cada sala y unir
    socket.join("some room");

    socket.on("chat", (data) => {
      socket.to(data.room).emit("reply", {
        user: socket.id,
        message: data.message,
        chat: data.room,
      });
    });

    // de más a más para hacer salas en tiempo real
    socket.on("joinRoom", (room) => {
      socket.join(room);
      socketIOInstance.to(room).emit("messageWelcome", {
        user: "Server",
        body: `New client connected to room ${room} ⏲️`,
        chat: room,
      });
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected ${socket.id}`);
    });
  });
};

module.exports = {
  connectSocketIO,
};
