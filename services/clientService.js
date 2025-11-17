import Client from "../models/Client.js";
import AppError from "../errors/AppError.js";

class ClientService {

    async getAllClients() {
        const clients = await Client.find();
        return clients;
    }

    async getClientById(id) {
        const client = await Client.findById(id);
        if (!client) throw new AppError("Cliente no encontrado", 404);
        return client;
    }

    async createClient(data) {
        const newClient = await Client.create(data);
        return newClient;
    }

    async updateClient(id, data) {
        const updatedClient = await Client.findByIdAndUpdate(id, data, { new: true });
        if (!updatedClient) throw new AppError("Cliente no encontrado", 404);
        return updatedClient;
    }

    async deleteClient(id) {
        const deletedClient = await Client.findByIdAndDelete(id);
        if (!deletedClient) throw new AppError("Cliente no encontrado", 404);
        return { message: "Cliente eliminado correctamente" };
    }
}

export default new ClientService();
