const Joi = require("joi");

const borrowSchema = Object.create(null);

borrowSchema.BORROW_BOOK = Joi.object({
  bookId: Joi.string().uuid().required(),
  clientId: Joi.string().uuid().required(),
});

borrowSchema.RETURN_BOOK = Joi.object({
  borrowRecordId: Joi.string().uuid().required(),
});

borrowSchema.GET_CLIENT_BORROWING = Joi.object({
  clientId: Joi.string().uuid().required(),
});

module.exports = borrowSchema;
