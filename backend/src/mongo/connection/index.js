const mongoose = require("mongoose");
require("dotenv").config();
console.log(process.env.MONGO_URL);

let dbUrl = process.env.MONGO_URL;

let mongodb;

const connectDB = async () => {
  mongoose.set("strictQuery", false);

  try {
    if (process.env.MONGO_URL === "test") {
      mongod = await MongoMemoryServer.create();
      dbUrl = mongod.getUri();
      console.log(dbUrl);
    }

    await mongoose.connect(dbUrl);

    const mongo = mongoose.connection;
    mongo.on("error", (error) => console.error(error));
  } catch (e) {
    console.log(e);
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
  disconnectDB
}