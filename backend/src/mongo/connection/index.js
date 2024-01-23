const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
require("dotenv").config();

let mongodb = null;

const connectDB = async () => {
  mongoose.set("strictQuery", false);
  try {
    let dbUrl = process.env.MONGO_URL;
    if (process.env.NODE_ENV === "test") {
      mongodb = await MongoMemoryServer.create();
      dbUrl = mongodb.getUri();
      console.log(dbUrl);
    }

    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
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
