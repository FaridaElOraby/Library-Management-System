import express from "express";
import { readdirSync } from "fs";
import { join } from "path";
const app = express();
const port = process.env.PORT || 3000;

require("dotenv").config();

// Load routes from the controllers folder
const controllersPath = join(__dirname, "controllers");
const controllers = readdirSync(controllersPath);

controllers.forEach((file) => {
  const controllerPath = join(controllersPath, file);
  const routes = require(controllerPath);
  app.use("/", routes);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
