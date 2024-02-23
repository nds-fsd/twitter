const express = require("express");
const { connectMongoDB } = require("./connections/mongo.js");
const { connectPostgresDB } = require("./connections/postgres.js");
const { connectSocketIO } = require("./connections/socketio.js");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const router = require("./routers/index");

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

app.use("/", router);

const server = require("http").createServer(app);

connectMongoDB().then((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Connected to Mongo database!");
  }
});

connectPostgresDB().then((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Connected to Postgres database!");
  }
});

connectSocketIO(server).then((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Connected to WebSocket!");
  }
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Express server is up and running at ${port}`);
});

module.exports = { app, server };
