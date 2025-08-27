const Genre = require("../models/genre");

const getAllGenres = async () => {
  return await Genre.findAll();
};

const getGenreById = async (id) => {
  return await Genre.findByPk(id);
};

const createGenre = async (data) => {
  return await Genre.create(data);
};

const updateGenre = async (id, data) => {
  const genre = await Genre.findByPk(id);
  if (!genre) return null;
  return await genre.update(data);
};

const deleteGenre = async (id) => {
  const genre = await Genre.findByPk(id);
  if (!genre) return null;
  await genre.destroy();
  return true;
};

module.exports = {
  getAllGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre
};