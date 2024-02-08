const Borrowing = require("../models/borrowed");

// DAL to get all borrowinh histroy filtered by filters
async function getAll(filter, options) {
  return await Borrowing.findAll({
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
  const borrow = await Borrowing.findOne(query);
  if (borrow) {
    await borrow.update(updateStatement);
  } else {
    const error = new Error("Borrowed not found");
    error.statusCode = 404;
    throw error;
  }
}

// DAL to find a borrow by query
async function findOne(query) {
  return await Borrowing.findOne(query);
}

module.exports = {
  getAll,
  create,
  update,
  findOne,
};
