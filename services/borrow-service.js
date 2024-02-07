const borrowDAL = require("../dal/borrow-dal");
const clientService = require("./clients-service");
const bookService = require("./books-service");

// Service to get borrowing history
async function getBorrowingHistroy() {
  return await borrowDAL.getAll();
}

// Service to add new record for borrowed book
async function borrowBook(borrow) {
  borrow.borrowedAt = new Date();

  borrow.dueDate = new Date();
  borrow.dueDate.setDate(borrow.dueDate.getDate() + 14);

  borrow.status = "STATUS_BORROWED";

  const client = await clientService.getClient(borrow.clientId);
  if (!client) {
    throw new Error("Client not found");
  }

  const book = await bookService.getBook(borrow.bookId);
  if (!book) {
    throw new Error("Book not found");
  }

  if (book.available_quantity <= 0) {
    throw new Error("Book not available");
  }

  const updateStatement = {
    available_quantity: book.dataValues.available_quantity - 1,
  };

  await bookService.updateBook(borrow.bookId, updateStatement);

  return await borrowDAL.create(borrow);
}

// Service to return book
async function returnBook(borrowRecordId) {
  const query = {
    where: {
      id: borrowRecordId,
      status: "STATUS_BORROWED",
    },
  };
  const borrowedRecord = await borrowDAL.findOne(query);

  if (!borrowedRecord) {
    throw new Error("Borrowed record not found");
  }

  const book = await bookService.getBook(borrowedRecord.bookId);
  if (!book) {
    throw new Error("Book not found");
  }

  const bookUpdateStatement = {
    available_quantity: book.dataValues.available_quantity + 1,
  };

  await bookService.updateBook(borrowedRecord.bookId, bookUpdateStatement);

  const updateStatement = {
    returnedAt: new Date(),
    status: "STATUS_RETURNED",
  };

  return await borrowDAL.update(query, updateStatement);
}

module.exports = {
  getBorrowingHistroy,
  borrowBook,
  returnBook,
};
