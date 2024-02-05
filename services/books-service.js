const booksDAL = require("../dal/books-dal");

// Service to get all books
async function getAllBooks() {
  return booksDAL.getAllBooks();
}

// Service to get books paginated
async function getBooks(page, pageSize) {
  return booksDAL.getBooks(page, pageSize);
}

// Service to get a book by id
async function getBook(bookId) {
  return booksDAL.getBook(bookId);
}

// Service to create a new book
async function createBook(book) {
  return booksDAL.createBook(book);
}

// Service to update a book by id
async function updateBook(bookId, updatedBook) {
  return booksDAL.updateBook(bookId, updatedBook);
}

// Service to delete a book by id
async function deleteBook(bookId) {
  return booksDAL.deleteBook(bookId);
}

module.exports = {
  getAllBooks,
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
