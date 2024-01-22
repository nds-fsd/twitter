const { connectDB, disconnectDB } = require("../mongo/connection/");
const mongoose = require("mongoose");
require("dotenv").config();

describe("Database Connection - Atlas", () => {
  beforeAll(async () => {
    process.env.NODE_ENV = "atlas";
    process.env.MONGO_URL_PROD;

    await connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it("should connect to the database", () => {
    expect(mongoose.connection.readyState).toEqual(1);
  });

  it("should disconnect from the database", async () => {
    await disconnectDB();
    expect(mongoose.connection.readyState).toEqual(0);
  });
});

describe("Database Connection - Docker", () => {
  beforeAll(async () => {
    process.env.NODE_ENV = "docker";
    process.env.MONGO_URL_DEV;

    await connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it("should connect to the database", () => {
    expect(mongoose.connection.readyState).toEqual(1);
  });

  it("should disconnect from the database", async () => {
    await disconnectDB();
    expect(mongoose.connection.readyState).toEqual(0);
  });
});

describe("Database Connection - Test", () => {
  beforeAll(async () => {
    process.env.NODE_ENV = "test";

    await connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it("should connect to the database", () => {
    expect(mongoose.connection.readyState).toEqual(1);
  });

  it("should disconnect from the database", async () => {
    await disconnectDB();
    expect(mongoose.connection.readyState).toEqual(0);
  });
});
