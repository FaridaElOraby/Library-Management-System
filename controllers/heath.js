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
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ error: err.message || "Internal server error" });
  }
});

// App health check endpoint
router.get("/app_health", (req, res) => {
  res.send(`App is running for ${process.uptime()} seconds`);
});

module.exports = router;
