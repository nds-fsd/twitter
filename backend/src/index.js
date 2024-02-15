const express = require("express");
const { connectDB } = require("./mongo");
const router = require("./routers/index");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const morgan = require("morgan");
// const http = require("http");
// const socketIo = require("socket.io");
dotenv.config();

const createApp = () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(cors());
  app.use(morgan("dev"));

  // const server = http.createServer(app);
  // const io = socketIo(server, { cors: { origins: ["*"] } });

  // io.on("connection", (socket) => {
  //   console.log("User connected:", socket.id);

  //   socket.on("disconnect", () => {
  //     console.log("User disconnected:", socket.id);
  //   });
  // });

  // app.set("io", io);

  app.use("/", router);

  connectDB().then((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Connected to database!");
    }
  });

  return app;
};

module.exports = { createApp };
