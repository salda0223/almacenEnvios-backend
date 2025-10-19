import Sale from "../models/Sale.js";

const findAll = async () => await Sale.find({ isActive: true }).populate("client").populate("products.product");
const findById = async (id) => await Sale.findOne({ _id: id, isActive: true }).populate("client").populate("products.product");
const create = async (data) => await Sale.create(data);
const softDelete = async (id) => await Sale.findByIdAndUpdate(id, { isActive: false }, { new: true });
const reactivate = async (id) => await Sale.findByIdAndUpdate(id, { isActive: true }, { new: true });

export default { findAll, findById, create, softDelete, reactivate };
