const Book = require("../models/books");

// DAL to get books paginated and filtered by name
async function getBooks(filter, options) {
  return await Book.findAll({
    where: filter,
    ...options,
  });
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
  } else {
    throw new Error("Book not found");
  }
}

// DAL to delete a book by id
async function deleteBook(bookId) {
  const book = await Book.findByPk(bookId);
  if (book) {
    await book.destroy();
  } else {
    throw new Error("Book not found");
  }
}

module.exports = {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
};
