const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
require("dotenv").config();

let dbUrl;
let mongod;

const connectDB = async () => {
  mongoose.set("strictQuery", false);

  try {
    if (process.env.NODE_ENV === "atlas") {
      dbUrl = process.env.MONGO_URL_PROD;
    } else if (process.env.NODE_ENV === "docker") {
      dbUrl = process.env.MONGO_URL_DEV;
    } else if (process.env.NODE_ENV === "test") {
      const mongod = await MongoMemoryServer.create();
      dbUrl = mongod.getUri();
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
    if (process.env.NODE_ENV === "test") {
      await mongod.stop();
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  connectDB,
  disconnectDB,
};
