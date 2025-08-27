const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Genre = sequelize.define("Genre", {
  genre_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  genre_name: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  freezeTableName: true,
  tableName: "genres",
  timestamps: false
});

module.exports = Genre;