const { v4: uuidv4 } = require("uuid");
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Book = sequelize.define("Book", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
    },
  },
  ISBN: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      is: "/^(?=(?:d{10}(?:(?:d{3}))?$)[d-]+$/",
    },
  },
  available_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: true,
      isInt: true,
    },
  },
  shelf_location: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
    },
  },
  author_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
    },
  },
});

module.exports = Book;
