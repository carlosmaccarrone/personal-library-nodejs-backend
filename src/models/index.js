const BookAuthor = require("./bookAuthor");
const BookGenre = require("./bookGenre");
const Author = require("./author");
const Genre = require("./genre");
const Book = require("./book");

// Books ↔ Authors
Book.belongsToMany(Author, { through: BookAuthor, foreignKey: "isbn", otherKey: "author_id" });
Author.belongsToMany(Book, { through: BookAuthor, foreignKey: "author_id", otherKey: "isbn" });

// Books ↔ Genres
Book.belongsToMany(Genre, { through: BookGenre, foreignKey: "isbn", otherKey: "genre_id" });
Genre.belongsToMany(Book, { through: BookGenre, foreignKey: "genre_id", otherKey: "isbn" });

module.exports = { Book, Author, Genre, BookAuthor, BookGenre };