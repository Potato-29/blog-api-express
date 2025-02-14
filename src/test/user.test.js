const request = require("supertest");
const { app, server } = require("../../app"); // Adjust path if needed

describe("User APIs", () => {
  let email = "testuser@gmail.com";
  let name = "Test case user";
  let password = "test123";

  it("should register a user", async () => {
    const res = await request(app).post("/api/user/register").send({
      name,
      email,
      password,
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body.data).toHaveProperty("email", email);
    expect(res.body.data).toHaveProperty("name", name);
  });

  it("should reject registration of existing user", async () => {
    const res = await request(app).post("/api/user/register").send({
      name,
      email,
      password,
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body).toHaveProperty("msg", "User by that email already exists");
  });

  it("should successfully login the user", async () => {
    const res = await request(app).post("/api/user/login").send({
      email,
      password,
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("success", true);
  });

  it("should get a incorrect email / not found error", async () => {
    const res = await request(app).post("/api/user/login").send({
      email: "test2@gmail.com",
      password: "test123",
    });

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body).toHaveProperty("msg", "User not found!");
  });

  it("should get a incorrect password error", async () => {
    const res = await request(app).post("/api/user/login").send({
      email: "test@gmail.com",
      password: "test1233",
    });

    expect(res.status).toBe(403);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body).toHaveProperty("msg", "Invalid Password!");
  });
});

// Close the server after all tests
afterAll(async () => {
  server.close();
});
