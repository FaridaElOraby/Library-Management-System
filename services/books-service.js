const booksDAL = require("../dal/books-dal");

// Service to get book by id
async function getBook(id) {
  const books = await getBooks({ id });

  if (books.length > 0) {
    return books[0];
  } else {
    throw new Error("Book not found");
  }
}

// Service to get books paginated and filtered
async function getBooks(query) {
  if (query) {
    const { page, pageSize, ...filter } = query;
    const options = {};
    if (page && pageSize) {
      options.offset = (page - 1) * pageSize;
      options.limit = pageSize;
    }
    return await booksDAL.getBooks(filter, options);
  }

  return await booksDAL.getBooks();
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
  return await booksDAL.deleteBook(bookId);
}

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
