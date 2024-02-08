const express = require("express");
const router = express.Router();
const booksService = require("../services/books-service");
const validationSchema = require("../validation-schemas/books-validation-schema");

// API to get all books unpaginated
router.get("/books/all", async (req, res) => {
  try {
    const validationResult = validationSchema.GET_ALL_BOOKS.validate(
      req.query,
      { abortEarly: false }
    );
    if (validationResult.error) {
      const errorMessage = validationResult.error.details
        .map((detail) => detail.message)
        .join(", ");

      const error = new Error(errorMessage);
      error.statusCode = 400;
      throw error;
    }

    const books = await booksService.getBooks(req.query);
    res.json(books);
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ error: err.message || "Internal server error" });
  }
});

// API to get books paginated
router.get("/books", async (req, res) => {
  try {
    const validationResult = validationSchema.GET_BOOKS_PAGINATED.validate(
      req.query,
      { abortEarly: false }
    );
    if (validationResult.error) {
      const errorMessage = validationResult.error.details
        .map((detail) => detail.message)
        .join(", ");

      const error = new Error(errorMessage);
      error.statusCode = 400;
      throw error;
    }

    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const books = await booksService.getBooks(req.query);

    res.json(books);
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ error: err.message || "Internal server error" });
  }
});

// API to create a new book
router.post("/books", async (req, res) => {
  try {
    const validationResult = validationSchema.CREATE_BOOK.validate(req.body, {
      abortEarly: false,
    });
    if (validationResult.error) {
      const errorMessage = validationResult.error.details
        .map((detail) => detail.message)
        .join(", ");

      const error = new Error(errorMessage);
      error.statusCode = 400;
      throw error;
    }

    const newBook = req.body;
    const createdBook = await booksService.createBook(newBook);

    res.status(201).json(createdBook);
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ error: err.message || "Internal server error" });
  }
});

// API to get a book by id
router.get("/books/:id", async (req, res) => {
  try {
    const validationResult = validationSchema.BOOK_ID.validate(req.params, {
      abortEarly: false,
    });
    if (validationResult.error) {
      const errorMessage = validationResult.error.details
        .map((detail) => detail.message)
        .join(", ");

      const error = new Error(errorMessage);
      error.statusCode = 400;
      throw error;
    }

    const id = req.params.id;
    const book = await booksService.getBook(id);

    res.status(200).json(book);
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ error: err.message || "Internal server error" });
  }
});

// API to update a book by id
router.put("/books/:id", async (req, res) => {
  try {
    const validationResult = validationSchema.BOOK_ID.validate(req.params, {
      abortEarly: false,
    });
    if (validationResult.error) {
      const errorMessage = validationResult.error.details
        .map((detail) => detail.message)
        .join(", ");

      const error = new Error(errorMessage);
      error.statusCode = 400;
      throw error;
    }

    const validationResult2 = validationSchema.UPDATE_BOOK.validate(req.body, {
      abortEarly: false,
    });
    if (validationResult2.error) {
      res.status(400).send(validationResult2.error.details[0].message);
      return;
    }

    const id = req.params.id;
    const updatedBook = req.body;

    await booksService.updateBook(id, updatedBook);
    res.sendStatus(204);
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ error: err.message || "Internal server error" });
  }
});

// API to delete a book by id
router.delete("/books/:id", async (req, res) => {
  try {
    const validationResult = validationSchema.BOOK_ID.validate(req.params, {
      abortEarly: false,
    });
    if (validationResult.error) {
      const errorMessage = validationResult.error.details
        .map((detail) => detail.message)
        .join(", ");

      const error = new Error(errorMessage);
      error.statusCode = 400;
      throw error;
    }

    const id = req.params.id;
    await booksService.deleteBook(id);

    res.sendStatus(204);
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ error: err.message || "Internal server error" });
  }
});

module.exports = router;
