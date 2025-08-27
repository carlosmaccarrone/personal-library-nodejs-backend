const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Genre = require("./genre");
const Book = require("./book");

const BookGenre = sequelize.define("Book_Genre", {
  isbn: {
    type: DataTypes.TEXT,
    references: {
      model: Book,
      key: "isbn"
    },
    primaryKey: true
  },
  genre_id: {
    type: DataTypes.BIGINT,
    references: {
      model: Genre,
      key: "genre_id"
    },
    primaryKey: true
  }
}, {
  tableName: "book_genre",
  timestamps: false
});

module.exports = BookGenre;