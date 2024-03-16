const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
require("dotenv").config();

const connectMongoDB = async () => {
  let dbUrl = process.env.MONGO_URL;
  if (process.env.NODE_ENV === "test") {
    const mongodb = await MongoMemoryServer.create();
    dbUrl = mongodb.getUri();
  }

  await mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = {
  connectMongoDB,
};
