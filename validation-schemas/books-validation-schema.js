const Joi = require("joi");

const bookSchema = Object.create(null);

bookSchema.CREATE_BOOK = Joi.object({
  title: Joi.string().required(),
  ISBN: Joi.string()
    .required()
    .regex(new RegExp("^(?=(?:D*d){10}(?:(?:D*d){3})?$)[d-]+$")),
  available_quantity: Joi.number().required(),
  shelf_location: Joi.string().required(),
  author_name: Joi.string().required(),
});

bookSchema.UPDATE_BOOK = Joi.object({
  title: Joi.string().optional(),
  ISBN: Joi.string()
    .optional()
    .regex(new RegExp("^(?=(?:D*d){10}(?:(?:D*d){3})?$)[d-]+$")),
  available_quantity: Joi.number().optional(),
  shelf_location: Joi.string().optional(),
  author_name: Joi.string().optional(),
});

bookSchema.BOOK_ID = Joi.object({
  id: Joi.string().uuid().required(),
});

bookSchema.GET_BOOKS_PAGINATED = Joi.object({
  page: Joi.number().required().min(0),
  pageSize: Joi.number().required().min(1),
});

module.exports = bookSchema;
