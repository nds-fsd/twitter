const supertest = require("supertest");
const { createApp } = require("../index");
const fakeRequest = supertest(createApp());
const { disconnectDB } = require("../mongo/index");

afterAll(async () => {
  await disconnectDB();
});

let createUser1,
  userData1,
  reqUser1,
  createUser2,
  userData2,
  reqUser2,
  resMeowId;

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

    reqUser1 = {
      headers: {
        authorization: `Bearer ${createUser1.body.token}`,
      },
      body: {
        meow: "My first Meow from User1",
        author: `${createUser1.body.user.id}`,
      },
    };

    userData2 = {
      name: "Liam",
      surname: "Miller",
      username: "liam.miller",
      birthday: "1993-11-30",
      mail: "liam.m@example.com",
      password: "P@ssw0rd456",
      dateOfRegister: "2023-09-18",
      meowCounter: 0,
      followingCounter: 0,
      followerCounter: 0,
    };

    createUser2 = await fakeRequest
      .post("/user/register")
      .send(userData2)
      .expect(201);

    reqUser2 = {
      headers: {
        authorization: `Bearer ${createUser2.body.token}`,
      },
      body: {
        meow: "My first Meow from User2",
        author: `${createUser2.body.user.id}`,
      },
    };
  });

  describe("createMeow Endpoint", () => {
    it("Create a meow correctly", async () => {
      const res = await fakeRequest
        .post("/meow/")
        .set("Authorization", reqUser1.headers.authorization)
        .send(reqUser1.body)
        .expect(201);

      resMeowId = res.body.meowId;

      const getUser = await fakeRequest
        .get(`/user/${userData1.username}`)
        .expect(200);

      expect(res.body.message).toBe("Meow created successfully");
      expect(getUser.body.meowCounter).toBe(1);
    });

    it("Create a meow with parentMeow correctly", async () => {
            const parentMeowId = resMeowId;

      const childMeowBody = {
        meow: "Child Meow",
        date: "2024-01-28",
        parentMeow: parentMeowId,
      };

      const childMeowRes = await fakeRequest
        .post("/meow/")
        .set("Authorization", reqUser1.headers.authorization)
        .send(childMeowBody)
        .expect(201);

      const getUser = await fakeRequest
        .get(`/user/${userData1.username}`)
        .expect(200);

      expect(childMeowRes.body.message).toBe("Meow created successfully");
      expect(getUser.body.meowCounter).toBe(2);

      const getParentMeow = await fakeRequest
        .get(`/meow/${parentMeowId}`)
        .set("Authorization", reqUser1.headers.authorization)
        .expect(200);

      expect(getParentMeow.body.replies).toBe(1);
    });
  });

  describe("getFeedMeows Endpoint", () => {
    it("Handle empty feed", async () => {
      const res = await fakeRequest
        .get("/meow/")
        .set("Authorization", reqUser2.headers.authorization)
        .expect(200);

      expect(res.body).toHaveLength(0);
    });

    it("Get feed meows", async () => {
      const follow = await fakeRequest
        .post("/follow")
        .set("Authorization", reqUser2.headers.authorization)
        .send({ username: userData1.username })
        .expect(200);

      const res = await fakeRequest
        .get("/meow/")
        .set("Authorization", reqUser2.headers.authorization)
        .expect(200);

      expect(res.body).toHaveLength(1);
    });
  });

  describe("getMeowById Endpoint", () => {
    it("Get meow by ID", async () => {
      const res = await fakeRequest
        .get(`/meow/${resMeowId}`)
        .set("Authorization", reqUser1.headers.authorization)
        .expect(200);
    });

    it("Return meow not found by ID", async () => {
      const res = await fakeRequest
        .get("/meow/65b2483a12c33226161f6287")
        .set("Authorization", reqUser1.headers.authorization)
        .expect(404);

      expect(res.body.error).toBe("Meow not found");
    });
  });

  describe("getMeowReplies Endpoint", () => {
    it("Get meow replies successfully", async () => {
      const parentMeowId = resMeowId;
      const childMeowBody = {
        meow: "Child Meow",
        date: "2024-01-28",
        parentMeow: parentMeowId,
      };

      const childMeowRes = await fakeRequest
        .post("/meow/")
        .set("Authorization", reqUser1.headers.authorization)
        .send(childMeowBody)
        .expect(201);

      const res = await fakeRequest
        .get(`/meow/replies/${parentMeowId}`)
        .set("Authorization", reqUser1.headers.authorization)
        .expect(200);

      expect(res.body[0].text).toBe("Child Meow");

      const getParentMeow = await fakeRequest
        .get(`/meow/${parentMeowId}`)
        .set("Authorization", reqUser1.headers.authorization)
        .expect(200);

      expect(getParentMeow.body.replies).toBe(2);
    });

    it("Return message when no replies found", async () => {
      const meowWithoutReplyBody = {
        meow: "Random Meow",
        date: "2024-01-28",
      };

      const meowWithoutReply = await fakeRequest
        .post("/meow/")
        .set("Authorization", reqUser1.headers.authorization)
        .send(meowWithoutReplyBody)
        .expect(201);

      const res = await fakeRequest
        .get(`/meow/replies/${meowWithoutReply.body.meowId}`)
        .set("Authorization", reqUser1.headers.authorization)
        .expect(404);

      console.log(res.body);
      expect(res.body.message).toBe("No replies found.");
    });
  });

  describe("updateMeow Endpoint", () => {
    it("Update meow successfully", async () => {
      const body = { text: "Meow modificado" };
      const res = await fakeRequest
        .patch(`/meow/${resMeowId}`)
        .set("Authorization", reqUser1.headers.authorization)
        .send(body)
        .expect(200);
    });

    it("Return meow not found", async () => {
      const body = { text: "Meow modificado" };
      const fakeId = "65b3b4b165a4390f94c261fc";
      const res = await fakeRequest
        .patch(`/meow/${fakeId}`)
        .set("Authorization", reqUser1.headers.authorization)
        .send(body)
        .expect(404);

      expect(res.body.error).toBe("Meow not found");
    });
  });

  describe("deleteMeow Endpoint", () => {
    it("Delete meow successfully", async () => {
      const res = await fakeRequest
        .delete(`/meow/${resMeowId}`)
        .set("Authorization", reqUser1.headers.authorization)
        .expect(201);

      expect(res.body.message).toBe("Successfully deleted meow");
    });

    it("Return meow not ", async () => {
      const res = await fakeRequest
        .delete("/meow/65b2483a12c33226161f6287")
        .set("Authorization", reqUser1.headers.authorization)
        .expect(404);

      expect(res.body.error).toBe("Meow not found");
    });
  });
});
