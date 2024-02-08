const { v4: uuidv4 } = require("uuid");
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Book = require("./books");
const Client = require("./clients");

const Borrowing = sequelize.define("borrowing", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  bookId: {
    type: DataTypes.UUID,
    allowNull: false,
    validate: { notNull: true, notEmpty: true },
    references: { model: "books", key: "id" },
  },
  clientId: {
    type: DataTypes.UUID,
    allowNull: false,
    validate: { notNull: true, notEmpty: true },
    references: { model: "clients", key: "id" },
  },
  borrowedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: true,
    },
  },
  returnedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  dueDate: {
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
      isIn: [["STATUS_BORROWED", "STATUS_RETURNED"]],
    },
  },
});

Borrowing.belongsTo(Book, { foreignKey: "bookId", as: "book" });
Borrowing.belongsTo(Client, { foreignKey: "clientId", as: "client" });

module.exports = Borrowing;
