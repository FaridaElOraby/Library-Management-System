const borrowDAL = require("../dal/borrow-dal");
const clientService = require("./clients-service");
const bookService = require("./books-service");
const { Op } = require("sequelize");

// Service to get overdue books
async function getOverdueBooks() {
  const query = {
    status: "STATUS_BORROWED",
    dueDate: {
      [Op.lt]: new Date(),
    },
  };

  return await borrowDAL.getAll(query);
}

// Service to get client's currently borrowed books
async function getClientBorrowing(clientId) {
  const client = await clientService.getClient(clientId);

  if (!client) {
    const error = new Error("Client not found");
    error.statusCode = 404;
    throw error;
  }

  const query = {
    status: "STATUS_BORROWED",
    clientId,
  };

  return await borrowDAL.getAll(query);
}

// Service to get borrowing history
async function getBorrowingHistroy(query) {
  if (query) {
    const { page, pageSize, ...filter } = query;
    const options = {};
    if (page && pageSize) {
      options.offset = (page - 1) * pageSize;
      options.limit = pageSize;
    }
    return await borrowDAL.getAll(filter, options);
  }
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
    const error = new Error("Client not found");
    error.statusCode = 404;
    throw error;
  }

  const book = await bookService.getBook(borrow.bookId);
  if (!book) {
    const error = new Error("Book not found");
    error.statusCode = 404;
    throw error;
  }

  if (book.available_quantity <= 0) {
    const error = new Error("Book not available");
    error.statusCode = 400;
    throw error;
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
    id: borrowRecordId,
  };

  const borrowedRecord = await borrowDAL.findOne(query);

  if (!borrowedRecord) {
    const error = new Error("Borrowed record not found");
    error.statusCode = 404;
    throw error;
  }

  if (borrowedRecord.status === "STATUS_RETURNED") {
    const error = new Error("Book already returned");
    error.statusCode = 400;
    throw error;
  }

  const book = await bookService.getBook(borrowedRecord.bookId);
  if (!book) {
    const error = new Error("Book not found");
    error.statusCode = 404;
    throw error;
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
  getClientBorrowing,
  getOverdueBooks,
  getBorrowingHistroy,
  borrowBook,
  returnBook,
};
