const express = require("express");
const router = express.Router();
const sequelize = require("../config/db");

// DB Health check endpoint
router.get("/sql_health", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.send(
      `Connected to the database. DB Server uptime: ${process.uptime()} seconds`
    );
  } catch (error) {
    console.error("Error connecting to the database:", error);
    res.status(500).send("Internal Server Error");
  }
});

// App health check endpoint
router.get("/app_health", (req, res) => {
  res.send(`App is running for ${process.uptime()} seconds`);
});

module.exports = router;
