const express = require("express");
const { connectDB } = require("./mongo/connection");
const cors = require("cors");
const app = express();
const router = require("./routers/index");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/", router);

connectDB().then(() => console.log("Connected to database!"));

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`Server is up and running at ${port}`);
});

module.exports = { app, server };
