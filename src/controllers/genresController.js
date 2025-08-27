const genreService = require("../services/genreService");

const getAllGenres = async (req, res) => {
  try {
    const genres = await genreService.getAllGenres();
    res.json(genres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching genres" });
  }
};

const getGenreById = async (req, res) => {
  try {
    const genre = await genreService.getGenreById(req.params.id);
    if (!genre) return res.status(404).json({ message: "Genre not found" });
    res.json(genre);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching genre" });
  }
};

const createGenre = async (req, res) => {
  try {
    const newGenre = await genreService.createGenre(req.body);
    res.status(201).json(newGenre);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating genre" });
  }
};

const updateGenre = async (req, res) => {
  try {
    const updated = await genreService.updateGenre(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Genre not found" });
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating genre" });
  }
};

const deleteGenre = async (req, res) => {
  try {
    const deleted = await genreService.deleteGenre(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Genre not found" });
    res.json({ message: "Genre deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting genre" });
  }
};

module.exports = {
  getAllGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre
};