const request = require("supertest");
const app = require("../../src/app");

jest.mock("../../src/services/bookService", () => ({
  getAllBooks: jest.fn().mockResolvedValue([{ isbn: "1234567890123", title: "Test Book" }]),
  getBookByIsbn: jest.fn().mockResolvedValue({ isbn: "1234567890123", title: "Test Book" }),
  createBook: jest.fn().mockResolvedValue({ isbn: "1234567890123", title: "Test Book" }),
  updateBook: jest.fn().mockResolvedValue({ isbn: "1234567890123", title: "Updated Test Book" }),
  getAuthorsOfBook: jest.fn().mockResolvedValue([{ author_id: 1, author_name: "Test Author" }]),
  getGenresOfBook: jest.fn().mockResolvedValue([{ genre_id: 1, genre_name: "Test Genre" }]),
  addAuthorToBook: jest.fn().mockResolvedValue({ message: "Author added to book" }),
  addGenreToBook: jest.fn().mockResolvedValue({ message: "Genre added to book" })
}));

describe("Books API (smoke)", () => {
  const bookIsbn = "1234567890123";
  const authorId = 1;
  const genreId = 1;

  test("POST /api/books → should create a new book", async () => {
    const res = await request(app)
      .post("/api/books")
      .send({ isbn: bookIsbn, title: "Test Book" });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("isbn");
  });

  test("GET /api/books → should return an array of books", async () => {
    const res = await request(app).get("/api/books");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /api/books/:isbn → should return the created book", async () => {
    const res = await request(app).get(`/api/books/${bookIsbn}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Test Book");
  });

  test("PUT /api/books/:isbn → should update the book", async () => {
    const res = await request(app)
      .put(`/api/books/${bookIsbn}`)
      .send({ title: "Updated Test Book" });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Updated Test Book");
  });

  test("GET /api/books/:isbn/authors → should return authors of book", async () => {
    const res = await request(app).get(`/api/books/${bookIsbn}/authors`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ author_id: authorId })])
    );
  });

  test("GET /api/books/:isbn/genres → should return genres of book", async () => {
    const res = await request(app).get(`/api/books/${bookIsbn}/genres`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ genre_id: genreId })])
    );
  });
});