const booksDAL = require("../dal/books-dal");
const borrowDAL = require("../dal/borrow-dal");

// Service to get book by id
async function getBook(id) {
  const books = await getBooks({ id });

  if (books.length > 0) {
    return books[0];
  } else {
    const error = new Error("Book not found");
    error.statusCode = 404;
    throw error;
  }
}

// Service to get books paginated and filtered
async function getBooks(query) {
  const { page, pageSize, ...filter } = query;
  const options = {};
  if (page && pageSize) {
    options.offset = (page - 1) * pageSize;
    options.limit = pageSize;
  }
  return await booksDAL.getBooks(filter, options);
}

// Service to create a new book
async function createBook(book) {
  return await booksDAL.createBook(book);
}

// Service to update a book by id
async function updateBook(bookId, updatedBook) {
  return await booksDAL.updateBook(bookId, updatedBook);
}

// Service to delete a book by id
async function deleteBook(bookId) {
  const borrowings = await borrowDAL.getAll({
    bookId,
    status: "STATUS_BORROWED",
  });

  if (borrowings.length > 0) {
    const error = new Error("Book is borrowed");
    error.statusCode = 400;
    throw error;
  } else {
    await borrowDAL.deleteBorrow({ bookId });
    return await booksDAL.deleteBook(bookId);
  }
}

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
