const request = require("supertest");
const { app, server } = require("../../app"); // Adjust path if needed

describe("Blog API", () => {
  let createdBlogId;

  it("should create a new blog", async () => {
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

    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty("title");
    createdBlogId = res.body.data._id;
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
      .send({
        title: updatedTitle,
      });

    expect(res.status).toBe(200);
  });

  it("should delete created blog", async () => {
    const res = await request(app).delete("/api/blog/" + createdBlogId);

    expect(res.status).toBe(200);
  });
});

// Close the server after all tests
afterAll(async () => {
  await server.close();
});
