const bookService = require("../../../src/services/bookService");
const { Book, Author, Genre } = require("../../../src/models");

jest.mock("../../../src/models/book");
jest.mock("../../../src/models/author");
jest.mock("../../../src/models/genre");

describe("Book Service", () => {
  const mockBook = {
    isbn: "1234567890123",
    title: "Test Book",
    update: jest.fn(),
    destroy: jest.fn(),
    addAuthor: jest.fn(),
    addGenre: jest.fn(),
    Authors: [],
    Genres: []
  };
  const mockAuthor = { author_id: 1 };
  const mockGenre = { genre_id: 1 };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getAllBooks should return all books", async () => {
    Book.findAll.mockResolvedValue([mockBook]);
    const result = await bookService.getAllBooks();
    expect(result).toEqual([mockBook]);
    expect(Book.findAll).toHaveBeenCalledWith({ include: [Author, Genre] });
  });

  test("getBookByIsbn should return a book if exists", async () => {
    Book.findByPk.mockResolvedValue(mockBook);
    const result = await bookService.getBookByIsbn("1234567890123");
    expect(result).toEqual(mockBook);
    expect(Book.findByPk).toHaveBeenCalledWith("1234567890123", { include: [Author, Genre] });
  });

  test("createBook should create and return a book", async () => {
    Book.create.mockResolvedValue(mockBook);
    const result = await bookService.createBook({ isbn: "1234567890123", title: "Test Book" });
    expect(result).toEqual(mockBook);
    expect(Book.create).toHaveBeenCalledWith({ isbn: "1234567890123", title: "Test Book" });
  });

  test("updateBook should update and return the book if exists", async () => {
    Book.findByPk.mockResolvedValue(mockBook);
    mockBook.update.mockResolvedValue({ ...mockBook, title: "Updated Book" });
    const result = await bookService.updateBook("1234567890123", { title: "Updated Book" });
    expect(result.title).toBe("Updated Book");
    expect(mockBook.update).toHaveBeenCalledWith({ title: "Updated Book" });
  });

  test("updateBook should return null if book does not exist", async () => {
    Book.findByPk.mockResolvedValue(null);
    const result = await bookService.updateBook("999", { title: "Nope" });
    expect(result).toBeNull();
  });

  test("deleteBook should destroy the book if exists", async () => {
    Book.findByPk.mockResolvedValue(mockBook);
    mockBook.destroy.mockResolvedValue();
    const result = await bookService.deleteBook("1234567890123");
    expect(result).toBe(true);
    expect(mockBook.destroy).toHaveBeenCalledTimes(1);
  });

  test("deleteBook should return null if book does not exist", async () => {
    Book.findByPk.mockResolvedValue(null);
    const result = await bookService.deleteBook("999");
    expect(result).toBeNull();
  });

  test("getAuthorsOfBook should return authors if book exists", async () => {
    const bookWithAuthors = { ...mockBook, Authors: [mockAuthor] };
    Book.findByPk.mockResolvedValue(bookWithAuthors);
    const result = await bookService.getAuthorsOfBook("1234567890123");
    expect(result).toEqual([mockAuthor]);
  });

  test("getGenresOfBook should return genres if book exists", async () => {
    const bookWithGenres = { ...mockBook, Genres: [mockGenre] };
    Book.findByPk.mockResolvedValue(bookWithGenres);
    const result = await bookService.getGenresOfBook("1234567890123");
    expect(result).toEqual([mockGenre]);
  });

  test("addAuthorToBook should call addAuthor if book and author exist", async () => {
    Book.findByPk.mockResolvedValue(mockBook);
    Author.findByPk.mockResolvedValue(mockAuthor);
    const result = await bookService.addAuthorToBook("1234567890123", 1);
    expect(result).toEqual({ message: "Author added to book" });
    expect(mockBook.addAuthor).toHaveBeenCalledWith(mockAuthor);
  });

  test("addAuthorToBook should throw if book or author not found", async () => {
    Book.findByPk.mockResolvedValue(null);
    Author.findByPk.mockResolvedValue(mockAuthor);
    await expect(bookService.addAuthorToBook("999", 1)).rejects.toThrow("Book or Author not found");
  });

  test("addGenreToBook should call addGenre if book and genre exist", async () => {
    Book.findByPk.mockResolvedValue(mockBook);
    Genre.findByPk.mockResolvedValue(mockGenre);
    const result = await bookService.addGenreToBook("1234567890123", 1);
    expect(result).toEqual({ message: "Genre added to book" });
    expect(mockBook.addGenre).toHaveBeenCalledWith(mockGenre);
  });

  test("addGenreToBook should throw if book or genre not found", async () => {
    Book.findByPk.mockResolvedValue(null);
    Genre.findByPk.mockResolvedValue(mockGenre);
    await expect(bookService.addGenreToBook("999", 1)).rejects.toThrow("Book or Genre not found");
  });
});