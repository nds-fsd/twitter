const supertest = require("supertest");
const { createApp } = require("../index");
const fakeRequest = supertest(createApp());
const { disconnectDB } = require("../mongo/index");

afterAll(async () => {
  await disconnectDB();
});

let createUser1, userData1, req, resMeowId;

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

      resMeowId = res.body.meowId;

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

  describe("getMeowById Endpoint", () => {
    it("Get meow by ID", async () => {
      const res = await fakeRequest
        .get(`/meow/${resMeowId}`)
        .set("Authorization", req.headers.authorization)
        .expect(200);
    });

    it("Return meow not found by ID", async () => {
      const res = await fakeRequest
        .get("/meow/65b2483a12c33226161f6287")
        .set("Authorization", req.headers.authorization)
        .expect(404);

        expect(res.body.error).toBe("Meow not found");
    });
  });
});
