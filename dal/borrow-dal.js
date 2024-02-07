const Borrowing = require("../models/borrowed");

// DAL to get all borrowinh histroy filtered by filters
async function getAll() {
  return await Borrowing.findAll();
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
    throw new Error("Borrowed not found");
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
