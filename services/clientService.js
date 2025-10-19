import Client from "../models/Client.js";
import AppError from "../errors/AppError.js";

const clientService = {

  getAllClients: async () => {
    const clients = await Client.find();

    return clients;
  },

 
  getClientById: async (id) => {
    const client = await Client.findById(id);
    if (!client) throw new AppError("Cliente no encontrado", 404);
    return client;
  },

 
  createClient: async (data) => {
    const newClient = await Client.create(data);
    return newClient;
  },

  
  updateClient: async (id, data) => {
    const updatedClient = await Client.findByIdAndUpdate(id, data, { new: true });
    if (!updatedClient) throw new AppError("Cliente no encontrado", 404);
    return updatedClient;
  },

 
  deleteClient: async (id) => {
    const deletedClient = await Client.findByIdAndDelete(id);
    if (!deletedClient) throw new AppError("Cliente no encontrado", 404);
    return { message: "Cliente eliminado correctamente" };
  },
};

export default clientService;
