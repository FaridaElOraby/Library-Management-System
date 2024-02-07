const Joi = require("joi");

const bookSchema = Object.create(null);

bookSchema.CREATE_BOOK = Joi.object({
  title: Joi.string().required(),
  ISBN: Joi.string()
    .required()
    .regex(
      new RegExp(
        "^(?:ISBN(?:-13)?:? )?(?=[0-9]{13}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)97[89][- ]?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9]$"
      )
    ),
  available_quantity: Joi.number().required(),
  shelf_location: Joi.string().required(),
  author_name: Joi.string().required(),
});

bookSchema.UPDATE_BOOK = Joi.object({
  title: Joi.string().optional(),
  ISBN: Joi.string()
    .optional()
    .regex(
      new RegExp(
        "^(?:ISBN(?:-13)?:? )?(?=[0-9]{13}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)97[89][- ]?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9]$"
      )
    ),
  available_quantity: Joi.number().optional(),
  shelf_location: Joi.string().optional(),
  author_name: Joi.string().optional(),
});

bookSchema.BOOK_ID = Joi.object({
  id: Joi.string().uuid().required(),
});

bookSchema.GET_BOOKS_PAGINATED = Joi.object({
  page: Joi.number().required().min(1),
  pageSize: Joi.number().required().min(1),
  title: Joi.string().optional(),
  author_name: Joi.string().optional(),
  ISBN: Joi.string()
    .optional()
    .regex(
      new RegExp(
        "^(?:ISBN(?:-13)?:? )?(?=[0-9]{13}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)97[89][- ]?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9]$"
      )
    ),
});

bookSchema.GET_ALL_BOOKS = Joi.object({
  title: Joi.string().optional(),
  author_name: Joi.string().optional(),
  ISBN: Joi.string()
    .optional()
    .regex(
      new RegExp(
        "^(?:ISBN(?:-13)?:? )?(?=[0-9]{13}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)97[89][- ]?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9]$"
      )
    ),
});

module.exports = bookSchema;
