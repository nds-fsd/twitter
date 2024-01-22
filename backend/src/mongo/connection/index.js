const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
require("dotenv").config();

let dbUrl = process.env.MONGO_URL;
let mongodb;

const connectDB = async () => {
  mongoose.set("strictQuery", false);

  try {
    if (process.env.MONGO_URL === "test") {
      mongodb = await MongoMemoryServer.create();
      dbUrl = mongodb.getUri();
      console.log(dbUrl);
    }

    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const mongo = mongoose.connection;
    mongo.on("error", (error) => console.error(error));
  } catch (err) {
    console.log(err);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    if (mongodb) {
      await mongodb.stop();
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  connectDB,
  disconnectDB,
};
