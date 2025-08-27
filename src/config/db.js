const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("personal_library", "admin", "admin123", {
  host: "library_db",
  dialect: "postgres",
  port: 5432,
  logging: false,
});

module.exports = sequelize;