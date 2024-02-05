import { Router } from "express";
const router = Router();

// Import the pool object from the db.js file
import { query } from "../db";

// DB Health check endpoint
router.get("/sql_health", (req, res) => {
  query("SELECT NOW()", (err, result) => {
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

export default router;
