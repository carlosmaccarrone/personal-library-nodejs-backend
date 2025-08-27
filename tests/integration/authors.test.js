const request = require("supertest");
const app = require("../../src/app");

jest.mock("../../src/services/authorService", () => ({
  getAllAuthors: jest.fn().mockResolvedValue([{ author_id: 1, author_name: "Test Author" }]),
  getAuthorById: jest.fn().mockResolvedValue({ author_id: 1, author_name: "Test Author" }),
  createAuthor: jest.fn().mockResolvedValue({ author_id: 1, author_name: "Test Author" }),
  updateAuthor: jest.fn().mockResolvedValue({ author_id: 1, author_name: "Updated Author" }),
  deleteAuthor: jest.fn().mockResolvedValue(true)
}));

const authorService = require("../../src/services/authorService");

describe("Authors API (smoke)", () => {
  let authorId = 1;

  test("GET /api/authors → should return an array", async () => {
    const res = await request(app).get("/api/authors");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("POST /api/authors → should create a new author", async () => {
    const res = await request(app)
      .post("/api/authors")
      .send({ author_name: "Test Author" });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("author_id");
    expect(res.body.author_name).toBe("Test Author");
  });

  test("GET /api/authors/:id → should return the author", async () => {
    const res = await request(app).get(`/api/authors/${authorId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.author_name).toBe("Test Author");
  });

  test("PUT /api/authors/:id → should update the author", async () => {
    const res = await request(app)
      .put(`/api/authors/${authorId}`)
      .send({ author_name: "Updated Author" });
    expect(res.statusCode).toBe(200);
    expect(res.body.author_name).toBe("Updated Author");
  });

  test("DELETE /api/authors/:id → should delete the author", async () => {
    const res = await request(app).delete(`/api/authors/${authorId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);
  });
});