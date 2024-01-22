const request = require("supertest");
const app = require("../../routers/user");

const userData = {
  name: "John",
  surname: "Doe",
  username: "john.doe",
  birthday: "1990-01-01",
  mail: "john.doe@example.com",
  password: "password123",
  dateOfRegister: "2022-01-01",
};

describe("User Endpoints", () => {
  describe("Create a user ", () => {
    it("Create a new user", async () => {
      const response = await request(app)
        .post("/register")
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty("user");
      expect(response.body.user.name).toBe("John");
      expect(response.body.user.surname).toBe("Doe");
      expect(response.body.user.username).toBe("john.doe");
    });
  });
});
