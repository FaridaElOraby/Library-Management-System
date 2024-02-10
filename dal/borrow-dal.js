const Borrowing = require("../models/borrowed");
const Book = require("../models/books");
const Client = require("../models/clients");

// DAL to get all borrowinh histroy filtered by filters
async function getAll(filter, options) {
  return await Borrowing.findAll({
    include: [
      {
        model: Book,
        as: "book",
        attributes: ["title", "author_name", "ISBN"],
      },
      {
        model: Client,
        as: "client",
        attributes: ["name", "email"],
      },
    ],
    where: filter,
    ...options,
  });
}

// DAL to create a new borrowed record
async function create(borrow) {
  return await Borrowing.create(borrow);
}

// DAL to update a borrow by id
async function update(query, updateStatement) {
  const borrow = await Borrowing.findOne({
    where: query,
  });
  if (borrow) {
    return await borrow.update(updateStatement);
  } else {
    const error = new Error("Borrowed not found");
    error.statusCode = 404;
    throw error;
  }
}

// DAL to find a borrow by query
async function findOne(query) {
  return await Borrowing.findOne({
    where: query,
  });
}

//DAL to delete a borrow by query
async function deleteBorrow(query) {
  return await Borrowing.destroy({
    where: query,
  });
}

module.exports = {
  getAll,
  create,
  update,
  findOne,
  deleteBorrow,
};
