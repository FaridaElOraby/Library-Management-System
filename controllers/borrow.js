const express = require("express");
const router = express.Router();
const borrowService = require("../services/borrow-service");
const validationSchema = require("../validation-schemas/borrow-validation-schema");

router.get("/borrowing-history", async (req, res) => {
  try {
    const borrowingRecords = await borrowService.getBorrowingHistroy();
    res.json(borrowingRecords);
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ error: err.message || "Internal server error" });
  }
});

router.get("/overdue-books", async (req, res) => {
  try {
    const borrowingRecords = await borrowService.getOverdueBooks();
    res.json(borrowingRecords);
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ error: err.message || "Internal server error" });
  }
});

router.post("/borrow-book", async (req, res) => {
  try {
    const validationResult = validationSchema.BORROW_BOOK.validate(req.body);
    if (validationResult.error) {
      const error = new Error(validationResult.error.details[0].message);
      error.statusCode = 400;
      throw error;
    }

    const createdBorrowingRecord = await borrowService.borrowBook(req.body);

    res.status(201).json(createdBorrowingRecord);
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ error: err.message || "Internal server error" });
  }
});

router.post("/return-book/:borrowRecordId", async (req, res) => {
  try {
    const validationResult = validationSchema.RETURN_BOOK.validate(req.params);
    if (validationResult.error) {
      const error = new Error(validationResult.error.details[0].message);
      error.statusCode = 400;
      throw error;
    }

    const borrowRecordId = req.params.borrowRecordId;
    const updatedBorrow = await borrowService.returnBook(borrowRecordId);

    res.json(updatedBorrow);
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ error: err.message || "Internal server error" });
  }
});

module.exports = router;