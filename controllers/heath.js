const express = require("express");
const router = express.Router();

// Import the pool object from the db.js file
const pool = require("../db");

// DB Health check endpoint
router.get("/sql_health", (req, res) => {
  pool.query("SELECT NOW()", (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send(`Connected to the database at ${result.rows[0].now}`);
    }
  });
});

// App health check endpoint
router.get("/app_health", (req, res) => {
  res.send(`App is running for ${process.uptime()} seconds`);
});

module.exports = router;
