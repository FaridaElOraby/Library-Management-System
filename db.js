const { Pool } = require("pg");

// Use the DATABASE_URL environment variable to connect to the database
const connectionString = process.env.DATABASE_URL;

// Create a new pool object using the connection string
const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
