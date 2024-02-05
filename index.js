const express = require("express");
require("dotenv").config();

const fs = require("fs");
const path = require("path");
const port = process.env.PORT || 3000;
const sequelize = require("./config/db");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Load routes from the controllers folder
const controllersPath = path.join(__dirname, "controllers");
const controllers = fs.readdirSync(controllersPath);
controllers.forEach((file) => {
  const controllerPath = path.join(controllersPath, file);
  const routes = require(controllerPath);
  app.use("/", routes);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });
