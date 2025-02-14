const request = require("supertest");
const { app, server } = require("../../app"); // Adjust path if needed

describe("Blog API", () => {
  let createdBlogId;
  let userToken;

  it("should get a successful login", async () => {
    const res = await request(app).post("/api/user/login").send({
      email: "test@gmail.com",
      password: "test123",
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("success", true);

    userToken = res.body.data;
  }, 10000);

  it("should create a new blog", async () => {
    const res = await request(app)
      .post("/api/blog")
      .set("Authorization", "Bearer " + userToken)
      .send({
        title: `Blog Post Test`,
        content: `This is the content of blog post number Test.`,
        author: `Author Test`,
        tags: ["sample", "blog", "post"],
        reads: Math.floor(Math.random() * 300) + 1,
        comments: [
          {
            author: "Jane Smith",
            content: "Great post!",
            created_at: "2023-10-01T13:00:00Z",
          },
          {
            author: "Alice Johnson",
            content: "Thanks for sharing!",
            created_at: "2023-10-01T14:00:00Z",
          },
        ],
        reads: 150,
      });

    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty("title");
    createdBlogId = res.body.data._id;
  });

  it("should throw unauthorized to create blog", async () => {
    const res = await request(app)
      .post("/api/blog")
      .send({
        title: `Blog Post Test`,
        content: `This is the content of blog post number Test.`,
        author: `Author Test`,
        tags: ["sample", "blog", "post"],
        reads: Math.floor(Math.random() * 300) + 1,
        comments: [
          {
            author: "Jane Smith",
            content: "Great post!",
            created_at: "2023-10-01T13:00:00Z",
          },
          {
            author: "Alice Johnson",
            content: "Thanks for sharing!",
            created_at: "2023-10-01T14:00:00Z",
          },
        ],
        reads: 150,
      });

    expect(res.status).toBe(401);
  });

  it("should fetch all blogs", async () => {
    const res = await request(app).get("/api/blog");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data.blogs)).toBe(true);
  });

  it("should fetch created blog", async () => {
    const res = await request(app).get("/api/blog/" + createdBlogId);

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty("_id", createdBlogId);
  });

  it("should update created blog", async () => {
    const updatedTitle = "Updated Title";
    const res = await request(app)
      .put("/api/blog/" + createdBlogId)
      .set("Authorization", "Bearer " + userToken)
      .send({
        title: updatedTitle,
      });

    expect(res.status).toBe(200);
  });

  it("should throw unauthorized to update", async () => {
    const updatedTitle = "Updated Title";
    const res = await request(app)
      .put("/api/blog/" + createdBlogId)
      .send({
        title: updatedTitle,
      });

    expect(res.status).toBe(401);
  });

  it("should delete created blog", async () => {
    const res = await request(app)
      .delete("/api/blog/" + createdBlogId)
      .set("Authorization", "Bearer " + userToken);
    expect(res.status).toBe(200);
  });

  it("should throw unauthorized to delete", async () => {
    const res = await request(app).delete("/api/blog/" + createdBlogId);
    expect(res.status).toBe(401);
  });

  it("should throw a not found blog (404) error", async () => {
    const res = await request(app).get("/api/blog/67aeece548f6f37937225499");

    expect(res.status).toBe(404);
  });
});

// Close the server after all tests
afterAll(async () => {
  await server.close();
});
