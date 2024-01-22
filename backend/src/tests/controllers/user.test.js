const supertest = require("supertest");
const { app, server } = require("../../index");
const fakeRequest = supertest(app);
const User = require("../../schemas/user");
const { disconnectDB } = require("../../mongo/connection/index");

describe("User Controller TEST", () => {
  afterAll(async () => {
    await disconnectDB();
    server.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("POST /user", () => {
    it("Create a new user", async () => {
      const userData = {
        name: "John",
        surname: "Doe",
        username: "john.doe",
        birthday: "1990-01-01",
        mail: "john.doe@example.com",
        password: "Password123!",
        dateOfRegister: "2022-01-01",
      };

      const res = await fakeRequest.post("/user/register").send(userData);
      
      expect(res.status).toBe(201);
      expect(res.body.user.name).toBe("John");
      expect(res.body.user.surname).toBe("Doe");
      expect(res.body.user.username).toBe("john.doe");
      // expect(res.body.id).not.toBe(undefined);
    });
  });
});
