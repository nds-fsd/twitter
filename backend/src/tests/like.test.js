const supertest = require("supertest");
const { createApp } = require("../index");
const fakeRequest = supertest(createApp());
const { disconnectDB } = require("../mongo/index");

afterAll(async () => {
  await disconnectDB();
});

let userTest;

function createUserData(overrides = {}) {
  userTest = {
    name: "John",
    surname: "Doe",
    username: "john.doe",
    birthday: "1990-01-01",
    mail: "john.doe@example.com",
    password: "Password123!",
    dateOfRegister: "2022-01-01",
  };

  return { ...userTest, ...overrides };
}

describe("Like Controller TEST", () => {
  describe("Endpoint to create a user", () => {
    it("Return an error if mail is not valid", async () => {
      userTest = createUserData({ mail: "john.doe@example" });

      const res = await fakeRequest
        .post("/user/register")
        .send(userTest)
        .expect(400);

      expect(res.body.error).toEqual("Mail is not valid");
    });
  });
});

// let createUser, createMeow, createLike, userData, meowData, req, getLikedMeow;

// describe("Like Controller TEST", () => {
//   beforeAll(async () => {
//     userData = {
//       name: "John",
//       surname: "Doe",
//       username: "john.doe",
//       birthday: "1990-01-01",
//       mail: "john.doe@example.com",
//       password: "Password123!",
//       dateOfRegister: "2022-01-01",
//       meowCounter: 0,
//       followingCounter: 0,
//       followerCounter: 0,
//     };

//     meowData = {
//       text: "This is a test meow",
//       author: null,
//     };

//     createUser = await fakeRequest
//       .post("/user/register")
//       .send(userData)
//       .expect(201);

//     meowData.author = createUser.body.user.id;

//     createMeow = await fakeRequest.post("/meow").send(meowData).expect(200);

//     req = {
//       headers: {
//         authorization: `Bearer ${createUser.body.token}`,
//       },
//     };
//   });

//   describe("checkLikeStatus Endpoint", () => {
//     it("Check like status and return false", async () => {
//       const resStatus = await fakeRequest
//         .get(`/like/${createMeow.body.meow.id}`)
//         .set("Authorization", req.headers.authorization)
//         .expect(200);

//       expect(resStatus.body.isLiked).toBe(false);
//     });

//     it("Check like status and return meow not exist", async () => {
//       const resStatus = await fakeRequest
//         .get("/like/invalidMeowId")
//         .set("Authorization", req.headers.authorization)
//         .expect(404);

//       expect(resStatus.body.error).toBe("The meow to like does not exist");
//     });

//     it("Check like status and return true", async () => {
//       const resLike = await fakeRequest
//         .post(`/like/${createMeow.body.meow.id}`)
//         .set("Authorization", req.headers.authorization)
//         .expect(200);

//       const resStatus = await fakeRequest
//         .get(`/like/${createMeow.body.meow.id}`)
//         .set("Authorization", req.headers.authorization)
//         .expect(200);

//       expect(resStatus.body.isLiked).toBe(true);
//     });
//   });

//   describe("likeMeow Endpoint", () => {
//     it("Like a meow correctly", async () => {
//       const resLike = await fakeRequest
//         .post(`/like/${createMeow.body.meow.id}`)
//         .set("Authorization", req.headers.authorization)
//         .expect(200);

//       expect(resLike.body.message).toBe("The meow has been liked successfully");

//       getLikedMeow = await fakeRequest
//         .get(`/meow/${createMeow.body.meow.id}`)
//         .expect(200);

//       expect(getLikedMeow.body.meow.likes).toBe(1);
//     });

//     it("Meow does not exist", async () => {
//       const resLike = await fakeRequest
//         .post("/like/invalidMeowId")
//         .set("Authorization", req.headers.authorization)
//         .expect(404);

//       expect(resLike.body.error).toBe("The meow to like does not exist");
//     });

//     it("User already liked the meow", async () => {
//       const resLike = await fakeRequest
//         .post(`/like/${createMeow.body.meow.id}`)
//         .set("Authorization", req.headers.authorization)
//         .expect(400);

//       expect(resLike.body.error).toBe("You already liked this meow");
//     });
//   });

//   describe("unlikeMeow Endpoint", () => {
//     it("Unlike a meow correctly", async () => {
//       const resUnlike = await fakeRequest
//         .delete(`/like/${createMeow.body.meow.id}`)
//         .set("Authorization", req.headers.authorization)
//         .expect(200);

//       expect(resUnlike.body.message).toBe(
//         "The meow has been unliked successfully"
//       );

//       getLikedMeow = await fakeRequest
//         .get(`/meow/${createMeow.body.meow.id}`)
//         .expect(200);

//       expect(getLikedMeow.body.meow.likes).toBe(0);
//     });

//     it("Meow does not exist", async () => {
//       const resUnlike = await fakeRequest
//         .delete("/like/invalidMeowId")
//         .set("Authorization", req.headers.authorization)
//         .expect(404);

//       expect(resUnlike.body.error).toBe("The meow to like does not exist");
//     });

//     it("User has not liked the meow", async () => {
//       const resUnlike = await fakeRequest
//         .delete(`/like/${createMeow.body.meow.id}`)
//         .set("Authorization", req.headers.authorization)
//         .expect(400);

//       expect(resUnlike.body.error).toBe("You do not like this meow");
//     });
//   });
// });
