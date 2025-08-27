const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Book = sequelize.define("Book", {
  isbn: {
    type: DataTypes.TEXT,
    primaryKey: true
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  freezeTableName: true,
  tableName: "books",
  timestamps: false
});

module.exports = Book;