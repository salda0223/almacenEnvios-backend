import Product from "../models/Product.js";

class ProductRepository {

    async findAll() {
        return await Product.find({ isActive: true });
    }

    async findById(id) {
        return await Product.findOne({ _id: id, isActive: true });
    }

    async create(data) {
        return await Product.create(data);
    }

    async update(id, data) {
        return await Product.findByIdAndUpdate(id, data, { new: true });
    }

    async softDelete(id) {
        return await Product.findByIdAndUpdate(id, { isActive: false }, { new: true });
    }

    async reactivate(id) {
        return await Product.findByIdAndUpdate(id, { isActive: true }, { new: true });
    }
}

export default new ProductRepository();
