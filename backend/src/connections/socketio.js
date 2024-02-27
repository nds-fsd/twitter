const io = require("socket.io");

const connectSocketIO = async (server) => {
  const socket = io(server, { cors: { origins: ["*"] } });
  const chats = {};

  socket.on("joinChat", (data) => {
    const chat = data.chat;
    socket.join(chat);
    socket.to(chat).emit("msg", {
      user: "Bot",
      message: `Usuario ${socket.id} se ha unido a la sala ${chat}`,
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    for (const chat in chats) {
      if (chats[chat].has(socket.id)) {
        chats[chat].delete(socket.id);
        socket.to(chat).emit("msg", {
          user: "Bot",
          message: `Usuario ${socket.id} ha abandonado la sala ${chat}`,
        });
        break;
      }
    }
  });

  socket.on("msg", (data) => {
    console.log("Message received:", data);
    socket.to(data.chat).emit("msg", data);
  });
};

module.exports = {
  connectSocketIO,
};
