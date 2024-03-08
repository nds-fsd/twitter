const supertest = require("supertest");
const { createApp } = require("../index");
const fakeRequest = supertest(createApp());
const { disconnectDB } = require("../mongo/index");

afterAll(async () => {
  await disconnectDB();
});

let userData, createUser, createMeow, req, resMeowId, getLikedMeow;

describe("Like Controller TEST", () => {
  beforeAll(async () => {
    userData = {
      name: "John",
      surname: "Doe",
      username: "john.doe",
      birthday: "1990-01-01",
      mail: "john.doe@example.com",
      password: "Password123!",
      dateOfRegister: "2022-01-01",
      meowCounter: 0,
      followingCounter: 0,
      followerCounter: 0,
    };

    createUser = await fakeRequest
      .post("/user/register")
      .send(userData)
      .expect(201);

    req = {
      headers: {
        authorization: `Bearer ${createUser.body.token}`,
      },
      body: {
        meow: "My first Meow",
        author: `${createUser.body.user.id}`,
      },
    };

    createMeow = await fakeRequest
      .post("/meow")
      .set("Authorization", req.headers.authorization)
      .send(req.body)
      .expect(201);

    resMeowId = createMeow.body.meowId;
  });

  describe("checkLikeStatus Endpoint", () => {
    it("Check like status and return false", async () => {
      const resStatus = await fakeRequest
        .get(`/like/${resMeowId}`)
        .set("Authorization", req.headers.authorization)
        .expect(200);

      expect(resStatus.body.isLiked).toBe(false);
    });
  });

  describe("likeMeow Endpoint", () => {
    it("Return meow not exist", async () => {
      const res = await fakeRequest
        .post("/like/65af984243c63a45fc3b6473")
        .set("Authorization", req.headers.authorization)
        .expect(404);

      expect(res.body.error).toBe("The meow to like does not exist");
    });

    it("Like a meow correctly", async () => {
      const resLike = await fakeRequest
        .post(`/like/${resMeowId}`)
        .set("Authorization", req.headers.authorization)
        .expect(200);

      expect(resLike.body.message).toBe("The meow has been liked successfully");

      getLikedMeow = await fakeRequest
        .get(`/meow/${resMeowId}`)
        .set("Authorization", req.headers.authorization)
        .expect(200);

      expect(getLikedMeow.body.likes).toBe(1);
    });

    it("User already liked the meow", async () => {
      const resLike = await fakeRequest
        .post(`/like/${resMeowId}`)
        .set("Authorization", req.headers.authorization)
        .expect(400);

      expect(resLike.body.error).toBe("You already liked this meow");
    });
  });

  describe("unlikeMeow Endpoint", () => {
    it("Unlike a meow correctly", async () => {
      const resUnlike = await fakeRequest
        .delete(`/like/${resMeowId}`)
        .set("Authorization", req.headers.authorization)
        .expect(200);

      expect(resUnlike.body.message).toBe(
        "The meow has been unliked successfully",
      );

      getLikedMeow = await fakeRequest
        .get(`/meow/${resMeowId}`)
        .set("Authorization", req.headers.authorization)
        .expect(200);

      expect(getLikedMeow.body.likes).toBe(0);
    });

    it("Return meow not exist", async () => {
      const res = await fakeRequest
        .delete("/like/65af984243c63a45fc3b6473")
        .set("Authorization", req.headers.authorization)
        .expect(404);

      expect(res.body.error).toBe("The meow to like does not exist");
    });

    it("User has not liked the meow", async () => {
      const resUnlike = await fakeRequest
        .delete(`/like/${resMeowId}`)
        .set("Authorization", req.headers.authorization)
        .expect(400);

      expect(resUnlike.body.error).toBe("You do not like this meow");
    });
  });
});
