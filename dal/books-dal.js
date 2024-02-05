const Book = require("../models/books");

// DAL to get all books
async function getAllBooks() {
  return await Book.findAll();
}

// DAL to get books paginated
async function getBooks(page, pageSize) {
  const offset = (page - 1) * pageSize;
  return await Book.findAll({ offset, limit: pageSize });
}

// DAL to get a book by id
async function getBook(bookId) {
  return await Book.findByPk(bookId);
}

// DAL to create a new book
async function createBook(book) {
  return await Book.create(book);
}

// DAL to update a book by id
async function updateBook(bookId, updatedBook) {
  const book = await Book.findByPk(bookId);
  if (book) {
    await book.update(updatedBook);
  }
}

// DAL to delete a book by id
async function deleteBook(bookId) {
  const book = await Book.findByPk(bookId);
  if (book) {
    await book.destroy();
  }
}

module.exports = {
  getAllBooks,
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
