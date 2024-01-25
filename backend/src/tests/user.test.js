const supertest = require("supertest");
const { app, server } = require("../index");
const fakeRequest = supertest(app);
const { disconnectDB } = require("../mongo/index");

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

afterAll(async () => {
  await disconnectDB();
  server.close();
});

describe("User Controller TEST", () => {
  describe("Endpoint to create a user", () => {
    it("Return an error if mail is not valid", async () => {
      userTest = createUserData({ mail: "john.doe@example" });

      const res = await fakeRequest
        .post("/user/register")
        .send(userTest)
        .expect(400);

      expect(res.body.error).toEqual("Mail is not valid");
    });

    it("Return an error if password is not valid", async () => {
      userTest = createUserData({ password: "password123" });

      const res = await fakeRequest
        .post("/user/register")
        .send(userTest)
        .expect(400);

      expect(res.body).toEqual({
        message:
          "Password must be 8 to 15 character long, contain one lower case, one upper case, one number and one special character.",
      });
    });

    it("Return an error if missing required fields", async () => {
      userTest = createUserData({ surname: undefined });

      const res = await fakeRequest
        .post("/user/register")
        .send(userTest)
        .expect(400);

      expect(res.body.error).toEqual("Missing required fields");
    });

    it("Create a new user", async () => {
      userTest = createUserData();

      const res = await fakeRequest
        .post("/user/register")
        .send(userTest)
        .expect(201);

      expect(res.body).toHaveProperty("token");
      expect(res.body).toHaveProperty("user");
      expect(res.body.user.name).toBe("John");
      expect(res.body.user.surname).toBe("Doe");
      expect(res.body.user.username).toBe("john.doe");
      expect(res.body.user.id).not.toBe(undefined);
    });

    it("Return an error if mail is already registered", async () => {
      userTest = createUserData({
        mail: "john.doe@example.com",
        username: "john.doe2",
      });

      const res = await fakeRequest
        .post("/user/register")
        .send(userTest)
        .expect(400);

      expect(res.body.error.mail).toEqual("Mail already registered");
    });

    it("Return an error if username is already registered", async () => {
      userTest = createUserData({
        mail: "john.doe2@example.com",
        username: "john.doe",
      });

      const res = await fakeRequest
        .post("/user/register")
        .send(userTest)
        .expect(400);

      expect(res.body.error.username).toEqual("Username already registered");
    });

    it("Return an error if mail and username are already registered", async () => {
      userTest = createUserData({
        mail: "john.doe@example.com",
        username: "john.doe",
      });

      const res = await fakeRequest
        .post("/user/register")
        .send(userTest)
        .expect(400);

      expect(res.body.error).toEqual({
        mail: "Mail already registered",
        username: "Username already registered",
      });
    });
  });

  describe("Endpoint to get all users", () => {
    it("Get all users successfully", async () => {
      const res = await fakeRequest.get("/user/").expect(200);

      expect(Array.isArray(res.body)).toBe(true);

      if (res.body.length > 0) {
        userTest = res.body[0];
        expect(userTest).toHaveProperty("_id");
        expect(userTest).toHaveProperty("name");
        expect(userTest).toHaveProperty("surname");
        expect(userTest).toHaveProperty("username");
        expect(userTest).toHaveProperty("birthday");
        expect(userTest).toHaveProperty("mail");
        expect(userTest).toHaveProperty("password");
        expect(userTest).toHaveProperty("dateOfRegister");
        expect(userTest).toHaveProperty("meowCounter");
        expect(userTest).toHaveProperty("followingCounter");
        expect(userTest).toHaveProperty("followerCounter");
      }
    });
  });

  describe("Endpoint to get user by username", () => {
    it("Get user by username", async () => {
      const res = await fakeRequest
        .get(`/user/${userTest.username}`)
        .expect(200);

      expect(typeof res.body).toBe("object");
      expect(res.body).toHaveProperty("username", userTest.username);
    });

    it("Return an error if user not found by username", async () => {
      const nonExistingUsername = "usuarioinexistente";

      const res = await fakeRequest
        .get(`/user/${nonExistingUsername}`)
        .expect(404);

      expect(typeof res.body).toBe("object");
      expect(res.body.error).toEqual("User not found");
    });
  });

  describe("Endpoint to get user by ID", () => {
    it("Get user by ID", async () => {
      const res = await fakeRequest.get(`/user/id/${userTest._id}`).expect(200);

      expect(typeof res.body).toBe("object");
      expect(res.body).toHaveProperty("_id", userTest._id);
    });

    it("Return an error if user not found by ID", async () => {
      const nonExistingId = "65af984243c63a45fc3b6473";

      const res = await fakeRequest
        .get(`/user/id/${nonExistingId}`)
        .expect(404);

      expect(typeof res.body).toBe("object");
      expect(res.body.error).toEqual("User not found");
    });
  });

  describe("Endpoint for login users", () => {
    it("Login a user successfully", async () => {
      const loginUserRequest = {
        mail: userTest.mail,
        password: "Password123!",
      };

      const res = await fakeRequest
        .post("/user/login")
        .send(loginUserRequest)
        .expect(201);

      expect(res.body).toHaveProperty("token");
      expect(res.body).toHaveProperty("user");
      expect(res.body.user).toEqual({
        name: userTest.name,
        surname: userTest.surname,
        username: userTest.username,
        id: userTest._id,
      });
    });

    it("Return an error if email or password is missing", async () => {
      const loginUserRequest = {};

      const res = await fakeRequest
        .post("/user/login")
        .send(loginUserRequest)
        .expect(400);

      expect(res.body.error.login).toEqual("Missing mail or password.");
    });

    it("Return an error if user not found", async () => {
      const loginUserRequest = {
        mail: "nonexisting@example.com",
        password: "Password123!",
      };

      const res = await fakeRequest
        .post("/user/login")
        .send(loginUserRequest)
        .expect(400);

      expect(res.body.error.mail).toEqual("User not found.");
    });

    it("Return an error if password is invalid", async () => {
      const loginUserRequest = {
        mail: userTest.mail,
        password: "wrongpassword",
      };

      const res = await fakeRequest
        .post("/user/login")
        .send(loginUserRequest)
        .expect(400);

      expect(res.body.error.password).toEqual("Invalid password.");
    });
  });

  describe("Endpoint for update user", () => {
    it("Update a user successfully", async () => {
      const updatedUserData = {
        town: "Barcelona",
        description: "Testing description",
      };

      const res = await fakeRequest
        .patch(`/user/${userTest.username}`)
        .send(updatedUserData)
        .expect(201);

      expect(res.body).toHaveProperty("town", "Barcelona");
      expect(res.body).toHaveProperty("description", "Testing description");
    });

    it("Return an error if user not found", async () => {
      const nonExistingUsername = "nonexistinguser";
      const updatedUserData = {
        town: "Barcelona",
        description: "Testing description",
      };

      const res = await fakeRequest
        .patch(`/user/${nonExistingUsername}`)
        .send(updatedUserData)
        .expect(404);

      expect(res.body.error).toEqual("User not found");
    });
  });

  describe("Endpoint for delete user", () => {
    it("Delete a user successfully", async () => {
      const res = await fakeRequest
        .delete(`/user/${userTest.username}`)
        .expect(201);

      expect(res.body.message).toEqual("Successfully deleted user");
    });

    it("Return an error if user not found", async () => {
      const nonExistingUsername = "nonexistinguser";

      const res = await fakeRequest
        .delete(`/user/${nonExistingUsername}`)
        .expect(404);

      expect(res.body.error).toEqual("User not found");
    });
  });
});
