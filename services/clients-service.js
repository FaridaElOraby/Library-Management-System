const clientsDAL = require("../dal/clients-dal");

// Service to get client by id
async function getClient(id) {
  const clients = await getClients({ id });

  if (clients.length > 0) {
    return clients[0];
  } else {
    throw new Error("client not found");
  }
}

// Service to get clients paginated and filtered
async function getClients(query) {
  if (query) {
    const { page, pageSize, ...filter } = query;
    const options = {};
    if (page && pageSize) {
      options.offset = (page - 1) * pageSize;
      options.limit = pageSize;
    }
    return await clientsDAL.getClients(filter, options);
  }

  return await clientsDAL.getClients();
}

// Service to create a new client
async function createClient(client) {
  client.registeredAt = new Date();

  return await clientsDAL.createClient(client);
}

// Service to update a client by id
async function updateClient(clientId, updatedclient) {
  return await clientsDAL.updateClient(clientId, updatedclient);
}

// Service to delete a client by id
async function deleteClient(clientId) {
  return await clientsDAL.deleteClient(clientId);
}

module.exports = {
  getClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
};
