const authorService = require("../services/authorService");

const getAllAuthors = async (req, res) => {
  try {
    const authors = await authorService.getAllAuthors();
    res.json(authors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching authors" });
  }
};

const getAuthorById = async (req, res) => {
  try {
    const author = await authorService.getAuthorById(req.params.id);
    if (!author) return res.status(404).json({ message: "Author not found" });
    res.json(author);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching author" });
  }
};

const createAuthor = async (req, res) => {
  try {
    const newAuthor = await authorService.createAuthor(req.body);
    res.status(201).json(newAuthor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating author" });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const updated = await authorService.updateAuthor(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Author not found" });
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating author" });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const deleted = await authorService.deleteAuthor(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Author not found" });
    res.json({ message: "Author deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting author" });
  }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
};