const supertest = require("supertest");
const { app, server } = require("../index");
const fakeRequest = supertest(app);
const { disconnectDB } = require("../mongo/index");

afterAll(async () => {
  await disconnectDB();
  server.close();
});

let createUser1, userData1, req, meow1;

describe("Meow Controller TEST", () => {
  beforeAll(async () => {
    userData1 = {
      name: "Sophia",
      surname: "Garcia",
      username: "sophia.garcia",
      birthday: "1995-04-12",
      mail: "sophia.g@example.com",
      password: "StrongPass789!",
      dateOfRegister: "2023-06-05",
      meowCounter: 0,
      followingCounter: 0,
      followerCounter: 0,
    };

    createUser1 = await fakeRequest
      .post("/user/register")
      .send(userData1)
      .expect(201);

    req = {
      headers: {
        authorization: `Bearer ${createUser1.body.token}`,
      },
      body: {
        meow: "My first Meow",
        date: "2022-01-01",
        author: `${createUser1.body.user.id}`,
      },
    };
  });

  describe("createMeow Endpoint", () => {
    it("Create a meow correctly", async () => {
      const res = await fakeRequest
        .post("/meow/")
        .set("Authorization", req.headers.authorization)
        .send(req.body)
        .expect(201);

      const getUser = await fakeRequest
        .get(`/user/${userData1.username}`)
        .expect(200);

      expect(res.body.message).toBe("Meow created successfully");
      expect(getUser.body.meowCounter).toBe(1);
    });
  });

  describe("getAllMeows Endpoint", () => {
    it("Get all meows", async () => {
      const res = await fakeRequest
        .get("/meow/")
        .set("Authorization", req.headers.authorization)
        .expect(200);
    });
  });
});
