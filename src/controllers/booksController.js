const bookService = require("../services/bookService");

const getAllBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching books" });
  }
};

const getBookByIsbn = async (req, res) => {
  try {
    const book = await bookService.getBookByIsbn(req.params.isbn);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching book" });
  }
};

const createBook = async (req, res) => {
  try {
    const newBook = await bookService.createBook(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating book" });
  }
};

const updateBook = async (req, res) => {
  try {
    const updated = await bookService.updateBook(req.params.isbn, req.body);
    if (!updated) return res.status(404).json({ message: "Book not found" });
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating book" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const deleted = await bookService.deleteBook(req.params.isbn);
    if (!deleted) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting book" });
  }
};

// many-to-many relationships
const getAuthorsOfBook = async (req, res) => {
  try {
    const authors = await bookService.getAuthorsOfBook(req.params.isbn);
    res.json(authors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching authors of book" });
  }
};

const getGenresOfBook = async (req, res) => {
  try {
    const genres = await bookService.getGenresOfBook(req.params.isbn);
    res.json(genres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching genres of book" });
  }
};

const addAuthorToBook = async (req, res) => {
  try {
    const result = await bookService.addAuthorToBook(req.params.isbn, req.params.id);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding author to book" });
  }
};

const addGenreToBook = async (req, res) => {
  try {
    const result = await bookService.addGenreToBook(req.params.isbn, req.params.id);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding genre to book" });
  }
};

module.exports = {
  getAllBooks,
  getBookByIsbn,
  createBook,
  updateBook,
  deleteBook,
  getAuthorsOfBook,
  getGenresOfBook,  
  addAuthorToBook,
  addGenreToBook
};