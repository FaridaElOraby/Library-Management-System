const express = require("express");
const router = express.Router();
const booksService = require("../services/books-service");
const validationSchema = require("../validation-schemas/books-validation-schema");

// API to get all books unpaginated
router.get("/books/all", async (req, res) => {
  try {
    const books = await booksService.getAllBooks();
    res.json(books);
  } catch (error) {
    console.error("Error fetching books", error);
    res.status(500).send("Internal Server Error");
  }
});

// API to get books paginated
router.get("/books", async (req, res) => {
  try {
    const validationResult = validationSchema.GET_BOOKS_PAGINATED.validate(
      req.query
    );

    if (validationResult.error) {
      res.status(400).send(validationResult.error.details[0].message);
      return;
    }

    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const books = await booksService.getBooks(page, pageSize);
    res.json(books);
  } catch (error) {
    console.error("Error fetching books", error);
    res.status(500).send("Internal Server Error");
  }
});

// API to create a new book
router.post("/books", async (req, res) => {
  try {
    const validationResult = validationSchema.CREATE_BOOK.validate(req.body);

    if (validationResult.error) {
      res.status(400).send(validationResult.error.details[0].message);
      return;
    }

    const newBook = req.body;
    const createdBook = await booksService.createBook(newBook);
    res.status(201).json(createdBook);
  } catch (error) {
    console.error("Error creating book", error);
    res.status(500).send("Internal Server Error");
  }
});

// API to get a book by id
router.get("/books/:id", async (req, res) => {
  try {
    const validationResult = validationSchema.BOOK_ID.validate(req.params);

    if (validationResult.error) {
      res.status(400).send(validationResult.error.details[0].message);
      return;
    }

    const bookId = req.params.id;
    await booksService.getBook(bookId);
    res.sendStatus(204);
  } catch (error) {
    console.error("Error getting book", error);
    res.status(500).send("Internal Server Error");
  }
});

// API to update a book by id
router.put("/books/:id", async (req, res) => {
  try {
    const validationResult = validationSchema.BOOK_ID.validate(req.params);

    if (validationResult.error) {
      res.status(400).send(validationResult.error.details[0].message);
      return;
    }

    const validationResult2 = validationSchema.UPDATE_BOOK.validate(req.body);
    if (validationResult2.error) {
      res.status(400).send(validationResult2.error.details[0].message);
      return;
    }

    const bookId = req.params.id;
    const updatedBook = req.body;
    await booksService.updateBook(bookId, updatedBook);
    res.sendStatus(204);
  } catch (error) {
    console.error("Error updating book", error);
    res.status(500).send("Internal Server Error");
  }
});

// API to delete a book by id
router.delete("/books/:id", async (req, res) => {
  try {
    const validationResult = validationSchema.BOOK_ID.validate(req.params);

    if (validationResult.error) {
      res.status(400).send(validationResult.error.details[0].message);
      return;
    }

    const bookId = req.params.id;
    await booksService.deleteBook(bookId);
    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting book", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
