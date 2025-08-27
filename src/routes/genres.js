const genresController = require("../controllers/genresController");
const express = require("express");
const router = express.Router();

// GET /genres
router.get("/", genresController.getAllGenres);

// GET /genres/:id
router.get("/:id", genresController.getGenreById);

// POST /genres
router.post("/", genresController.createGenre);

// PUT /genres/:id
router.put("/:id", genresController.updateGenre);

// DELETE /genres/:id
router.delete("/:id", genresController.deleteGenre);

module.exports = router;