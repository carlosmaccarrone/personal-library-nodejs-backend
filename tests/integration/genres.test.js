const request = require("supertest");
const app = require("../../src/app");

jest.mock("../../src/services/genreService", () => ({
  getAllGenres: jest.fn().mockResolvedValue([{ genre_id: 1, genre_name: "Test Genre" }]),
  getGenreById: jest.fn().mockResolvedValue({ genre_id: 1, genre_name: "Test Genre" }),
  createGenre: jest.fn().mockResolvedValue({ genre_id: 2, genre_name: "Another Genre" }),
  updateGenre: jest.fn().mockResolvedValue({ genre_id: 1, genre_name: "Updated Genre" }),
  deleteGenre: jest.fn().mockResolvedValue({ message: "Genre deleted" })
}));

describe("Genres API (smoke)", () => {
  const genreId = 1;

  test("GET /api/genres → should return an array of genres", async () => {
    const res = await request(app).get("/api/genres");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ genre_name: "Test Genre" })])
    );
  });

  test("GET /api/genres/:id → should return the created genre", async () => {
    const res = await request(app).get(`/api/genres/${genreId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.genre_name).toBe("Test Genre");
  });

  test("POST /api/genres → should create a new genre", async () => {
    const res = await request(app)
      .post("/api/genres")
      .send({ genre_name: "Another Genre" });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("genre_id");
    expect(res.body.genre_name).toBe("Another Genre");
  });

  test("PUT /api/genres/:id → should update the genre", async () => {
    const res = await request(app)
      .put(`/api/genres/${genreId}`)
      .send({ genre_name: "Updated Genre" });
    expect(res.statusCode).toBe(200);
    expect(res.body.genre_name).toBe("Updated Genre");
  });

  test("DELETE /api/genres/:id → should delete the genre", async () => {
    const res = await request(app).delete(`/api/genres/${genreId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);
  });
});