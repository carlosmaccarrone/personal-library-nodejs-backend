const { Book, Author, Genre } = require("../models/index");
const BookAuthor = require("../models/bookAuthor");
const BookGenre = require("../models/bookGenre");

const getAllBooks = async () => {
  return await Book.findAll({
    include: [Author, Genre]
  });
};

const getBookByIsbn = async (isbn) => {
  return await Book.findByPk(isbn, {
    include: [Author, Genre]
  });
};

const createBook = async (data) => {
  return await Book.create(data);
};

const updateBook = async (isbn, data) => {
  const book = await Book.findByPk(isbn);
  if (!book) return null;
  return await book.update(data);
};

const deleteBook = async (isbn) => {
  const book = await Book.findByPk(isbn);
  if (!book) return null;
  await book.destroy();
  return true;
};

// many-to-many
const getGenresOfBook = async (isbn) => {
  const book = await Book.findByPk(isbn, {
    include: [{ model: Genre, as: "Genres", through: { attributes: [] } }]
  });
  return book ? book.Genres : [];
};

const getAuthorsOfBook = async (isbn) => {
  const book = await Book.findByPk(isbn, {
    include: [{ model: Author, as: "Authors", through: { attributes: [] } }]
  });
  return book ? book.Authors : [];
};

const addAuthorToBook = async (isbn, authorId) => {
  const book = await Book.findByPk(isbn);
  const author = await Author.findByPk(authorId);
  if (!book || !author) throw new Error("Book or Author not found");
  await book.addAuthor(author);
  return { message: "Author added to book" };
};

const addGenreToBook = async (isbn, genreId) => {
  const book = await Book.findByPk(isbn);
  const genre = await Genre.findByPk(genreId);
  if (!book || !genre) throw new Error("Book or Genre not found");
  await book.addGenre(genre);
  return { message: "Genre added to book" };
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