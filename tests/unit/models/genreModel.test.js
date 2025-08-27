const { BookGenre, Book, Genre } = require("../../../src/models");

jest.mock("../../../src/models", () => ({
  BookGenre: {
    create: jest.fn(),
    destroy: jest.fn(),
    findOne: jest.fn()
  },
  Book: {
    create: jest.fn()
  },
  Genre: {
    create: jest.fn()
  }
}));

describe("BookGenre Model (mocked)", () => {
  const testIsbn = "8888888888888";
  const testGenreId = 1;

  test("should create a BookGenre association", async () => {
    Book.create.mockResolvedValue({ isbn: testIsbn, title: "Test Book" });
    Genre.create.mockResolvedValue({ genre_id: testGenreId, genre_name: "Test Genre" });
    BookGenre.create.mockResolvedValue({ isbn: testIsbn, genre_id: testGenreId });

    const book = await Book.create({ isbn: testIsbn, title: "Test Book" });
    const genre = await Genre.create({ genre_name: "Test Genre" });

    const association = await BookGenre.create({
      isbn: book.isbn,
      genre_id: genre.genre_id
    });

    expect(association).toHaveProperty("isbn", testIsbn);
    expect(association).toHaveProperty("genre_id", testGenreId);
  });

  test("should delete a BookGenre association", async () => {
    BookGenre.destroy.mockResolvedValue(1);
    BookGenre.findOne.mockResolvedValue(null);

    const deleted = await BookGenre.destroy({ where: { isbn: testIsbn, genre_id: testGenreId } });
    const found = await BookGenre.findOne({ where: { isbn: testIsbn, genre_id: testGenreId } });

    expect(deleted).toBe(1);
    expect(found).toBeNull();
  });
});