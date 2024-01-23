const express = require("express");
const { connectDB } = require("./mongo/connection");
const router = require("./routers/index");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();

app.use(bodyParser.json());
app.use(cors());

app.use("/", router);

let port = process.env.PORT;

if (process.env.NODE_ENV === "test") {
  port = process.env.TEST_PORT;
}

connectDB().then((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Connected to database!");
  }
});

const server = app.listen(port, () => {
  console.log(`Server is up and running at ${port}`);
});

module.exports = { app, server };
