const Author = require("../models/author");

const getAllAuthors = async () => {
  return await Author.findAll();
};

const getAuthorById = async (id) => {
  return await Author.findByPk(id);
};

const createAuthor = async (data) => {
  return await Author.create(data);
};

const updateAuthor = async (id, data) => {
  const author = await Author.findByPk(id);
  if (!author) return null;
  return await author.update(data);
};

const deleteAuthor = async (id) => {
  const author = await Author.findByPk(id);
  if (!author) return null;
  await author.destroy();
  return true;
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
};