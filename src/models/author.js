const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Author = sequelize.define("Author", {
  author_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  author_name: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  freezeTableName: true,
  tableName: "authors",
  timestamps: false
});

module.exports = Author;