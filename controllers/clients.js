const express = require("express");
const router = express.Router();
const clientsService = require("../services/clients-service");
const validationSchema = require("../validation-schemas/clients-validation-schema");

// API to get all clients unpaginated
router.get("/clients/all", async (req, res) => {
  try {
    const clients = await clientsService.getClients();
    res.json(clients);
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ error: err.message || "Internal server error" });
  }
});

// API to get clients paginated
router.get("/clients", async (req, res) => {
  try {
    const validationResult = validationSchema.GET_CLIENTS_PAGINATED.validate(
      req.query,
      { abortEarly: false }
    );
    if (validationResult.error) {
      const errorMessage = validationResult.error.details
        .map((detail) => detail.message)
        .join(", ");

      const error = new Error(errorMessage);
      error.statusCode = 400;
      throw error;
    }

    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const clients = await clientsService.getClients({ page, pageSize });

    res.json(clients);
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ error: err.message || "Internal server error" });
  }
});

// API to create a new client
router.post("/clients", async (req, res) => {
  try {
    const validationResult = validationSchema.CREATE_CLIENT.validate(req.body, {
      abortEarly: false,
    });
    if (validationResult.error) {
      const errorMessage = validationResult.error.details
        .map((detail) => detail.message)
        .join(", ");

      const error = new Error(errorMessage);
      error.statusCode = 400;
      throw error;
    }

    const newClient = req.body;
    const createdClient = await clientsService.createClient(newClient);

    res.status(201).json(createdClient);
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ error: err.message || "Internal server error" });
  }
});

// API to get a client by id
router.get("/clients/:id", async (req, res) => {
  try {
    const client = await clientsService.getClient(req.params.id);
    if (!client) {
      res.status(404).send("Client not found");
      return;
    }

    res.json(client);
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ error: err.message || "Internal server error" });
  }
});

// API to update a client by id
router.put("/clients/:id", async (req, res) => {
  try {
    const validationResult = validationSchema.UPDATE_CLIENT.validate(req.body, {
      abortEarly: false,
    });
    if (validationResult.error) {
      const errorMessage = validationResult.error.details
        .map((detail) => detail.message)
        .join(", ");

      const error = new Error(errorMessage);
      error.statusCode = 400;
      throw error;
    }

    const updatedClient = await clientsService.updateClient(
      req.params.id,
      req.body
    );
    if (!updatedClient) {
      res.status(404).send("Client not found");
      return;
    }

    res.sendStatus(204);
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ error: err.message || "Internal server error" });
  }
});

// API to delete a client by id
router.delete("/clients/:id", async (req, res) => {
  try {
    const deletedClient = await clientsService.deleteClient(req.params.id);
    if (!deletedClient) {
      res.status(404).send("Client not found");
      return;
    }

    res.sendStatus(204);
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ error: err.message || "Internal server error" });
  }
});

module.exports = router;
