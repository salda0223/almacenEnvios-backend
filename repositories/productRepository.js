import Product from "../models/Product.js";

const findAll = async () => await Product.find({ isActive: true });
const findById = async (id) => await Product.findOne({ _id: id, isActive: true });
const create = async (data) => await Product.create(data);
const update = async (id, data) => await Product.findByIdAndUpdate(id, data, { new: true });
const softDelete = async (id) => await Product.findByIdAndUpdate(id, { isActive: false }, { new: true });
const reactivate = async (id) => await Product.findByIdAndUpdate(id, { isActive: true }, { new: true });

export default { findAll, findById, create, update, softDelete, reactivate };
