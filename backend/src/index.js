const express = require("express");
const { connectMongoDB } = require("./connections/mongo.js");
const { connectPostgresDB } = require("./connections/postgres.js");
const { connectSocketIO } = require("./connections/socketio.js");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const router = require("./routers/index");

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

app.use("/", router);

const server = require("http").createServer(app);

connectMongoDB()
  .then(() => {
    console.log("Connected to Mongo database!");
  })
  .catch((error) => {
    console.error(error);
  });

connectPostgresDB()
  .then(() => {
    console.log("Connected to Postgres database!");
  })
  .catch((error) => {
    console.error(error);
  });

connectSocketIO(server)
  .then(() => {
    console.log("Connected to WebSocket!");
  })
  .catch((error) => {
    console.error(error);
  });

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Express server is up and running at ${port}`);
});

module.exports = { app, server };
