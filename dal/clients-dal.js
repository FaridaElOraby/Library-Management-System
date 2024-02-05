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
    throw new Error("Client not found");
  }
}

// DAL to delete a client by id
async function deleteClient(clientId) {
  const client = await Client.findByPk(clientId);
  if (client) {
    return await client.destroy();
  } else {
    throw new Error("Client not found");
  }
}

module.exports = {
  getClients,
  createClient,
  updateClient,
  deleteClient,
};
