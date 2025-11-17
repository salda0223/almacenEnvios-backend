import Client from "../models/Client.js";

class ClientRepository {

    async findAll() {
        return await Client.find({ isActive: true });
    }

    async findById(id) {
        return await Client.findOne({ _id: id, isActive: true });
    }

    async findByCedula(cedula) {
        return await Client.findOne({ cedula });
    }

    async create(data) {
        return await Client.create(data);
    }

    async update(id, data) {
        return await Client.findByIdAndUpdate(id, data, { new: true });
    }

    async softDelete(id) {
        return await Client.findByIdAndUpdate(id, { isActive: false }, { new: true });
    }

    async reactivate(id) {
        return await Client.findByIdAndUpdate(id, { isActive: true }, { new: true });
    }
}

export default new ClientRepository();
