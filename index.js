const express = require("express");
const { Pool } = require("pg");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.get("/sql_health", (req, res) => {
  pool.query("SELECT NOW()", (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send(`Connected to the database at ${result.rows[0].now}`);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
