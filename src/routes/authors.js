const authorsController = require("../controllers/authorsController");
const express = require("express");
const router = express.Router();

// GET /authors → list all authors
router.get("/", authorsController.getAllAuthors);

// GET /authors/:id → returns an author by ID
router.get("/:id", authorsController.getAuthorById);

// POST /authors → create an author
router.post("/", authorsController.createAuthor);

// PUT /authors/:id → update an author
router.put("/:id", authorsController.updateAuthor);

// DELETE /authors/:id → delete an author
router.delete("/:id", authorsController.deleteAuthor);

module.exports = router;