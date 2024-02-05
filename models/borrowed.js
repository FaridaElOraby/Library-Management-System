const { v4: uuidv4 } = require("uuid");
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Borrowed = sequelize.define("Borrowed", {
  borrowing_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  book_id: {
    type: DataTypes.UUID,
    allowNull: false,
    validate: { notNull: true, notEmpty: true },
    references: { model: "Books", key: "id" },
  },
  client_id: {
    type: DataTypes.UUID,
    allowNull: false,
    validate: { notNull: true, notEmpty: true },
    references: { model: "Clients", key: "id" },
  },
  checkout_date: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: true,
    },
  },
  return_date: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: true,
    },
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: true,
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      isIn: ["STATUS_BORROWED", "STATUS_RETURNED"],
    },
  },
});

module.exports = Borrowed;
