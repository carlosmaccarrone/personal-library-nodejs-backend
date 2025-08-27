const booksController = require("../controllers/booksController");
const express = require("express");
const router = express.Router();

// GET /books → list all books with authors and genres
router.get("/", booksController.getAllBooks);

// GET /books/:isbn → returns a book by ISBN with authors and genres
router.get("/:isbn", booksController.getBookByIsbn);

// POST /books → create a book
router.post("/", booksController.createBook);

// PUT /books/:isbn → update a book
router.put("/:isbn", booksController.updateBook);

// DELETE /books/:isbn → delete a book
router.delete("/:isbn", booksController.deleteBook);

// GET /books/:isbn/authors → list authors of a book
router.get("/:isbn/authors", booksController.getAuthorsOfBook);

// GET /books/:isbn/genres → list genres of a book
router.get("/:isbn/genres", booksController.getGenresOfBook);

// POST /books/:isbn/authors/:id → associate an author
router.post("/:isbn/authors/:id", booksController.addAuthorToBook);

// POST /books/:isbn/genres/:id → associate a gender
router.post("/:isbn/genres/:id", booksController.addGenreToBook);

module.exports = router;