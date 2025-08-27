const { Author } = require("../../../src/models");

jest.mock("../../../src/models", () => ({
  Author: {
    create: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn()
  }
}));

describe("Author Model (mocked)", () => {
  let authorId = 1;

  test("should create a new author", async () => {
    Author.create.mockResolvedValue({ author_id: authorId, author_name: "Test Author" });

    const author = await Author.create({ author_name: "Test Author" });
    expect(author).toHaveProperty("author_id");
    expect(author.author_name).toBe("Test Author");
  });

  test("should find an author by ID", async () => {
    Author.findByPk.mockResolvedValue({ author_id: authorId, author_name: "Test Author" });

    const author = await Author.findByPk(authorId);
    expect(author).not.toBeNull();
    expect(author.author_name).toBe("Test Author");
  });

  test("should update an author", async () => {
    Author.update.mockResolvedValue([1]);

    const updated = await Author.update(
      { author_name: "Updated Author" },
      { where: { author_id: authorId } }
    );
    expect(updated[0]).toBe(1);
  });

  test("should delete an author", async () => {
    Author.destroy.mockResolvedValue(1);

    const deleted = await Author.destroy({ where: { author_id: authorId } });
    expect(deleted).toBe(1);
  });
});