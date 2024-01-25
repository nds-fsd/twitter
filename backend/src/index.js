const express = require("express");
const { connectDB } = require("./mongo");
const router = require("./routers/index");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();

const createApp = () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(cors());

  app.use("/", router);

  connectDB().then((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Connected to database!");
    }
  });

  return app;
}

module.exports = {createApp}

