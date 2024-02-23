const io = require("socket.io");

const connectSocketIO = async (server) => {
  const socketIOInstance = io(server, { cors: { origins: ["*"] } });

  socketIOInstance.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    socket.broadcast.emit("msg", {
      user: socket.id,
      text: "ha entrado en el chat!",
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      socket.broadcast.emit("msg", {
        user: socket.id,
        text: "ha salido del chat.",
      });
    });

    socket.on("msg", (message) => {
      console.log("Message received:", message);
      socketIOInstance.emit("msg", message);
    });
  });
};

module.exports = {
  connectSocketIO,
};
