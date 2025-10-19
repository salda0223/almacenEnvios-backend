import Client from "../models/Client.js";

const findAll = async () => await Client.find({ isActive: true });
const findById = async (id) => await Client.findOne({ _id: id, isActive: true });
const findByCedula = async (cedula) => await Client.findOne({ cedula });

const create = async (data) => await Client.create(data);

const update = async (id, data) =>
  await Client.findByIdAndUpdate(id, data, { new: true });

const softDelete = async (id) =>
  await Client.findByIdAndUpdate(id, { isActive: false }, { new: true });

const reactivate = async (id) =>
  await Client.findByIdAndUpdate(id, { isActive: true }, { new: true });

export default {
  findAll,
  findById,
  findByCedula,
  create,
  update,
  softDelete,
  reactivate,
};
