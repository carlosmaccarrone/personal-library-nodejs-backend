const authorsRouter = require("./routes/authors");
const genresRouter = require("./routes/genres");
const booksRouter = require("./routes/books");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/books", booksRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/genres", genresRouter);

app.get("/", (req, res) => {
  res.send("📚 Personal Book Library Backend is running!");
});

module.exports = app;