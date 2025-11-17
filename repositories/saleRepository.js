import Sale from "../models/Sale.js";

class SaleRepository {
  async findAll() {
    return await Sale.find({ isActive: true })
      .populate("client")
      .populate("products.product");
  }

  async findById(id) {
    return await Sale.findOne({ _id: id, isActive: true })
      .populate("client")
      .populate("products.product");
  }

  async create(data) {
    return await Sale.create(data);
  }

  async softDelete(id) {
    return await Sale.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
  }

  async reactivate(id) {
    return await Sale.findByIdAndUpdate(
      id,
      { isActive: true },
      { new: true }
    );
  }
}

export default new SaleRepository();
