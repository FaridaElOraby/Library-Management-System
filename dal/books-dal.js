const pool = require("../db");

// DAL to get all books
async function getAllBooks() {
  const query = "SELECT * FROM books";
  const result = await pool.query(query);
  return result.rows;
}

//DAL to get books paginated
async function getBooks(page, pageSize) {
  const offset = (page - 1) * pageSize;
  const query = "SELECT * FROM books ORDER BY id OFFSET $1 LIMIT $2";
  const values = [offset, pageSize];
  const result = await pool.query(query, values);
  return result.rows;
}

//DAL to get a book by id
async function getBook(bookId) {
  const query = "SELECT * FROM books WHERE id = $1";
  const values = [bookId];
  const result = await pool.query(query, values);
  return result.rows[0];
}

// DAL to create a new book
async function createBook(book) {
  const query = "INSERT INTO books (title, author) VALUES ($1, $2) RETURNING *";
  const values = [book.title, book.author];
  const result = await pool.query(query, values);
  return result.rows[0];
}

// DAL to update a book by id
async function updateBook(bookId, updatedBook) {
  const query = "UPDATE books SET title = $1, author = $2 WHERE id = $3";
  const values = [updatedBook.title, updatedBook.author, bookId];
  await pool.query(query, values);
}

// DAL to delete a book by id
async function deleteBook(bookId) {
  const query = "DELETE FROM books WHERE id = $1";
  const values = [bookId];
  await pool.query(query, values);
}

module.exports = {
  getAllBooks,
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
