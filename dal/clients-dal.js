const Client = require("../models/clients");

// DAL to get clients paginated and filtered by name
async function getClients(filter, options) {
  return await Client.findAll({
    where: filter,
    ...options,
  });
}

// DAL to create a new client
async function createClient(client) {
  return await Client.create(client);
}

// DAL to update a client by id
async function updateClient(clientId, updatedClient) {
  const client = await Client.findByPk(clientId);
  if (client) {
    return await client.update(updatedClient);
  } else {
    const error = new Error("Client not found");
    error.statusCode = 404;
    throw error;
  }
}

// DAL to delete a client by id
async function deleteClient(clientId) {
  const client = await Client.findByPk(clientId);
  if (client) {
    return await client.destroy();
  } else {
    const error = new Error("Client not found");
    error.statusCode = 404;
    throw error;
  }
}

module.exports = {
  getClients,
  createClient,
  updateClient,
  deleteClient,
};
