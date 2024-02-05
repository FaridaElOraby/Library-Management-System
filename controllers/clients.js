const express = require("express");
const router = express.Router();
const clientsService = require("../services/clients-service");
const validationSchema = require("../validation-schemas/clients-validation-schema");

// API to get all clients unpaginated
router.get("/clients/all", async (req, res) => {
  try {
    const clients = await clientsService.getClients();
    res.json(clients);
  } catch (error) {
    console.error("Error fetching clients", error);
    res.status(500).send("Internal Server Error");
  }
});

// API to get clients paginated
router.get("/clients", async (req, res) => {
  try {
    const validationResult = validationSchema.GET_CLIENTS_PAGINATED.validate(
      req.query
    );
    if (validationResult.error) {
      res.status(400).send(validationResult.error.details[0].message);
      return;
    }

    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const clients = await clientsService.getClients({ page, pageSize });

    res.json(clients);
  } catch (error) {
    console.error("Error fetching clients", error);
    res.status(500).send("Internal Server Error");
  }
});

// API to create a new client
router.post("/clients", async (req, res) => {
  try {
    const validationResult = validationSchema.CREATE_CLIENT.validate(req.body);
    if (validationResult.error) {
      res.status(400).send(validationResult.error.details[0].message);
      return;
    }

    const newClient = req.body;
    const createdClient = await clientsService.createClient(newClient);

    res.status(201).json(createdClient);
  } catch (error) {
    console.error("Error creating client", error);
    res.status(500).send("Internal Server Error");
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
  } catch (error) {
    console.error("Error fetching client", error);
    res.status(500).send("Internal Server Error");
  }
});

// API to update a client by id
router.put("/clients/:id", async (req, res) => {
  try {
    const validationResult = validationSchema.UPDATE_CLIENT.validate(req.body);
    if (validationResult.error) {
      res.status(400).send(validationResult.error.details[0].message);
      return;
    }

    const updatedClient = await clientsService.updateClient(
      req.params.id,
      req.body
    );
    if (!updatedClient) {
      res.status(404).send("Client not found");
      return;
    }

    res.json(updatedClient);
  } catch (error) {
    console.error("Error updating client", error);
    res.status(500).send("Internal Server Error");
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

    res.json(deletedClient);
  } catch (error) {
    console.error("Error deleting client", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
