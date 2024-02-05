const { Sequelize } = require("sequelize");

// Use the DATABASE_URL environment variable to connect to the database
const connectionString = process.env.DATABASE_URL;

// Create a new Sequelize object using the connection string
const sequelize = new Sequelize(connectionString, {});

module.exports = sequelize;
