const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Author = require("./author");
const Book = require("./book");

const BookAuthor = sequelize.define("Book_Author", {
  isbn: {
    type: DataTypes.TEXT,
    references: {
      model: Book,
      key: "isbn"
    },
    primaryKey: true
  },
  author_id: {
    type: DataTypes.BIGINT,
    references: {
      model: Author,
      key: "author_id"
    },
    primaryKey: true
  }
}, {
  freezeTableName: true,
  tableName: "book_author",
  timestamps: false
});

module.exports = BookAuthor;