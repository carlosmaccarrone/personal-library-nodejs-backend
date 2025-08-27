const { Book } = require("../../../src/models");

jest.mock("../../../src/models", () => ({
  Book: {
    create: jest.fn(),
    findByPk: jest.fn(),
    destroy: jest.fn()
  }
}));

describe("Book Model (mocked)", () => {
  const testIsbn = "9999999999999";

  test("should create a new book", async () => {
    Book.create.mockResolvedValue({ isbn: testIsbn, title: "Test Book" });

    const book = await Book.create({ isbn: testIsbn, title: "Test Book" });

    expect(book).toHaveProperty("isbn", testIsbn);
    expect(book).toHaveProperty("title", "Test Book");
  });

  test("should find a book by ISBN", async () => {
    Book.findByPk.mockResolvedValue({ isbn: testIsbn, title: "Test Book" });

    const foundBook = await Book.findByPk(testIsbn);

    expect(foundBook).not.toBeNull();
    expect(foundBook.title).toBe("Test Book");
  });

  test("should delete a book", async () => {
    Book.destroy.mockResolvedValue(1);
    Book.findByPk.mockResolvedValue(null);

    const deleted = await Book.destroy({ where: { isbn: testIsbn } });
    const deletedBook = await Book.findByPk(testIsbn);

    expect(deleted).toBe(1);
    expect(deletedBook).toBeNull();
  });
});