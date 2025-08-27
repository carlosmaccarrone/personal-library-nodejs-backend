const genreService = require("../../../src/services/genreService");
const Genre = require("../../../src/models/genre");

jest.mock("../../../src/models/genre");

describe("Genre Service", () => {
  const mockGenre = { genre_id: 1, genre_name: "Test Genre", update: jest.fn(), destroy: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getAllGenres should return all genres", async () => {
    Genre.findAll.mockResolvedValue([mockGenre]);
    const result = await genreService.getAllGenres();
    expect(result).toEqual([mockGenre]);
    expect(Genre.findAll).toHaveBeenCalledTimes(1);
  });

  test("getGenreById should return genre if exists", async () => {
    Genre.findByPk.mockResolvedValue(mockGenre);
    const result = await genreService.getGenreById(1);
    expect(result).toEqual(mockGenre);
    expect(Genre.findByPk).toHaveBeenCalledWith(1);
  });

  test("createGenre should create and return the genre", async () => {
    Genre.create.mockResolvedValue(mockGenre);
    const result = await genreService.createGenre({ genre_name: "Test Genre" });
    expect(result).toEqual(mockGenre);
    expect(Genre.create).toHaveBeenCalledWith({ genre_name: "Test Genre" });
  });

  test("updateGenre should update and return genre if exists", async () => {
    Genre.findByPk.mockResolvedValue(mockGenre);
    mockGenre.update.mockResolvedValue({ ...mockGenre, genre_name: "Updated Genre" });

    const result = await genreService.updateGenre(1, { genre_name: "Updated Genre" });
    expect(result.genre_name).toBe("Updated Genre");
    expect(mockGenre.update).toHaveBeenCalledWith({ genre_name: "Updated Genre" });
  });

  test("updateGenre should return null if genre does not exist", async () => {
    Genre.findByPk.mockResolvedValue(null);
    const result = await genreService.updateGenre(99, { genre_name: "Nope" });
    expect(result).toBeNull();
  });

  test("deleteGenre should destroy genre if exists", async () => {
    Genre.findByPk.mockResolvedValue(mockGenre);
    mockGenre.destroy.mockResolvedValue();

    const result = await genreService.deleteGenre(1);
    expect(result).toBe(true);
    expect(mockGenre.destroy).toHaveBeenCalledTimes(1);
  });

  test("deleteGenre should return null if genre does not exist", async () => {
    Genre.findByPk.mockResolvedValue(null);
    const result = await genreService.deleteGenre(99);
    expect(result).toBeNull();
  });
});