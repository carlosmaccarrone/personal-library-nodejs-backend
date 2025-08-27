const authorService = require("../../../src/services/authorService");
const Author = require("../../../src/models/author");

jest.mock("../../../src/models/author");

describe("Author Service", () => {
  const mockAuthor = { author_id: 1, author_name: "Test Author", update: jest.fn(), destroy: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getAllAuthors should return all authors", async () => {
    Author.findAll.mockResolvedValue([mockAuthor]);
    const result = await authorService.getAllAuthors();
    expect(result).toEqual([mockAuthor]);
    expect(Author.findAll).toHaveBeenCalledTimes(1);
  });

  test("getAuthorById should return the author if exists", async () => {
    Author.findByPk.mockResolvedValue(mockAuthor);
    const result = await authorService.getAuthorById(1);
    expect(result).toEqual(mockAuthor);
    expect(Author.findByPk).toHaveBeenCalledWith(1);
  });

  test("createAuthor should create and return the author", async () => {
    Author.create.mockResolvedValue(mockAuthor);
    const result = await authorService.createAuthor({ author_name: "Test Author" });
    expect(result).toEqual(mockAuthor);
    expect(Author.create).toHaveBeenCalledWith({ author_name: "Test Author" });
  });

  test("updateAuthor should update and return the author if exists", async () => {
    Author.findByPk.mockResolvedValue(mockAuthor);
    mockAuthor.update.mockResolvedValue({ ...mockAuthor, author_name: "Updated Name" });

    const result = await authorService.updateAuthor(1, { author_name: "Updated Name" });
    expect(result.author_name).toBe("Updated Name");
    expect(Author.findByPk).toHaveBeenCalledWith(1);
    expect(mockAuthor.update).toHaveBeenCalledWith({ author_name: "Updated Name" });
  });

  test("updateAuthor should return null if author does not exist", async () => {
    Author.findByPk.mockResolvedValue(null);
    const result = await authorService.updateAuthor(99, { author_name: "Nope" });
    expect(result).toBeNull();
  });

  test("deleteAuthor should destroy the author if exists", async () => {
    Author.findByPk.mockResolvedValue(mockAuthor);
    mockAuthor.destroy.mockResolvedValue();

    const result = await authorService.deleteAuthor(1);
    expect(result).toBe(true);
    expect(Author.findByPk).toHaveBeenCalledWith(1);
    expect(mockAuthor.destroy).toHaveBeenCalledTimes(1);
  });

  test("deleteAuthor should return null if author does not exist", async () => {
    Author.findByPk.mockResolvedValue(null);
    const result = await authorService.deleteAuthor(99);
    expect(result).toBeNull();
  });
});