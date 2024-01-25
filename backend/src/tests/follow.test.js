const supertest = require("supertest");
const { createApp } = require("../index");
const fakeRequest = supertest(createApp());
const { disconnectDB } = require("../mongo/index");

afterAll(async () => {
  await disconnectDB();
});

let createUser1,
  createUser2,
  createUser3,
  userData1,
  userData2,
  userData3,
  req,
  getFollowerUser,
  getFollowedUser;

describe("Follow Controller TEST", () => {
  beforeAll(async () => {
    userData1 = {
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

    userData2 = {
      name: "Alice",
      surname: "Smith",
      username: "alice.smith",
      birthday: "1985-05-15",
      mail: "alice.smith@example.com",
      password: "SecurePass456!",
      dateOfRegister: "2021-11-15",
      meowCounter: 0,
      followingCounter: 0,
      followerCounter: 0,
    };

    userData3 = {
      name: "Emily",
      surname: "Johnson",
      username: "emily.johnson",
      birthday: "1988-08-22",
      mail: "emily.j@example.com",
      password: "Secure123Pass!",
      dateOfRegister: "2023-02-10",
      meowCounter: 0,
      followingCounter: 0,
      followerCounter: 0,
    };

    createUser1 = await fakeRequest
      .post("/user/register")
      .send(userData1)
      .expect(201);

    createUser2 = await fakeRequest
      .post("/user/register")
      .send(userData2)
      .expect(201);

    createUser3 = await fakeRequest
      .post("/user/register")
      .send(userData3)
      .expect(201);

    req = {
      headers: {
        authorization: `Bearer ${createUser1.body.token}`,
      },
    };
  });

  describe("checkFollowStatus Endpoint", () => {
    it("Check follow status and return false", async () => {
      const resStatus = await fakeRequest
        .get(`/follow/${userData1.username}`)
        .set("Authorization", req.headers.authorization)
        .expect(200);

      expect(resStatus.body.isFollowing).toBe(false);
    });

    it("Check follow status and return user not exist", async () => {
      const resStatus = await fakeRequest
        .get("/follow/fakeUser")
        .set("Authorization", req.headers.authorization)
        .expect(404);

      expect(resStatus.body.error).toBe("The user to follow does not exist");
    });

    it("Check follow status and return true", async () => {
      const resFollow = await fakeRequest
        .post("/follow")
        .set("Authorization", req.headers.authorization)
        .send({ username: userData3.username })
        .expect(200);

      const resStatus = await fakeRequest
        .get(`/follow/${userData3.username}`)
        .set("Authorization", req.headers.authorization)
        .expect(200);

      expect(resStatus.body.isFollowing).toBe(true);
    });
  });

  describe("FollowUser Endpoint", () => {
    it("Follow a user correctly", async () => {
      const resFollow = await fakeRequest
        .post("/follow")
        .set("Authorization", req.headers.authorization)
        .send({ username: userData2.username })
        .expect(200);

      expect(resFollow.body.message).toBe(
        "The user has been followed successfully"
      );

      getFollowerUser = await fakeRequest
        .get(`/user/${userData1.username}`)
        .expect(200);

      getFollowedUser = await fakeRequest
        .get(`/user/${userData2.username}`)
        .expect(200);

      expect(getFollowerUser.body.followingCounter).toBe(2);
      expect(getFollowedUser.body.followerCounter).toBe(1);
    });

    it("Following user does not exist", async () => {
      const resFollow = await fakeRequest
        .post("/follow")
        .set("Authorization", req.headers.authorization)
        .send({ username: "fakeUser" })
        .expect(404);

      expect(resFollow.body.error).toBe("Username does not exist");
    });

    it("User alredy followed", async () => {
      const resFollow = await fakeRequest
        .post("/follow")
        .set("Authorization", req.headers.authorization)
        .send({ username: userData2.username })
        .expect(400);

      expect(resFollow.body.error).toBe("You already follow this user");
    });
  });

  describe("UnfollowUser Endpoint", () => {
    it("Unfollow a user correctly", async () => {
      const resFollow = await fakeRequest
        .delete("/follow")
        .set("Authorization", req.headers.authorization)
        .send({ username: userData2.username })
        .expect(200);

      expect(resFollow.body.message).toBe(
        "You have successfully unfollowed the user"
      );

      getFollowerUser = await fakeRequest
        .get(`/user/${userData1.username}`)
        .expect(200);

      getFollowedUser = await fakeRequest
        .get(`/user/${userData2.username}`)
        .expect(200);

      expect(getFollowerUser.body.followingCounter).toBe(1);
      expect(getFollowedUser.body.followerCounter).toBe(0);
    });

    it("Following user does not exist", async () => {
      const resFollow = await fakeRequest
        .delete("/follow")
        .set("Authorization", req.headers.authorization)
        .send({ username: "fakeUser" })
        .expect(404);

      expect(resFollow.body.error).toBe("Username does not exist");
    });

    it("User alredy followed", async () => {
      const resFollow = await fakeRequest
        .delete("/follow")
        .set("Authorization", req.headers.authorization)
        .send({ username: userData2.username })
        .expect(400);

      expect(resFollow.body.error).toBe("You do not follow this user");
    });
  });
});
