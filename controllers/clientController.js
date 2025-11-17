import clientService from "../services/clientService.js";

class ClientController {

    async getClients(req, res, next) {
        try {
            const clients = await clientService.getAllClients();
            res.json(clients);
        } catch (error) {
            next(error);
        }
    }

    async getClientById(req, res, next) {
        try {
            const client = await clientService.getClientById(req.params.id);
            res.json(client);
        } catch (error) {
            next(error);
        }
    }

    async createClient(req, res, next) {
        try {
            const client = await clientService.createClient(req.body);
            res.status(201).json(client);
        } catch (error) {
            next(error);
        }
    }

    async updateClient(req, res, next) {
        try {
            const client = await clientService.updateClient(req.params.id, req.body);
            res.json(client);
        } catch (error) {
            next(error);
        }
    }

    async deleteClient(req, res, next) {
        try {
            const result = await clientService.deleteClient(req.params.id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default new ClientController();
