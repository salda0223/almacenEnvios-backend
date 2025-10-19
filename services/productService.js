import productRepository from "../repositories/productRepository.js";
import AppError from "../errors/AppError.js";

const getAllProducts = async () => await productRepository.findAll();
const getProductById = async (id) => {
  const product = await productRepository.findById(id);
  if (!product) throw new AppError("Producto no encontrado", 404);
  return product;
};
const createProduct = async (data) => await productRepository.create(data);
const updateProduct = async (id, data) => {
  const updated = await productRepository.update(id, data);
  if (!updated) throw new AppError("Producto no encontrado", 404);
  return updated;
};
const deleteProduct = async (id) => {
  const deleted = await productRepository.softDelete(id);
  if (!deleted) throw new AppError("Producto no encontrado", 404);
  return { message: "Producto eliminado correctamente" };
};
const reactivateProduct = async (id) => {
  const reactivated = await productRepository.reactivate(id);
  if (!reactivated) throw new AppError("Producto no encontrado o ya activo", 404);
  return { message: "Producto reactivado correctamente" };
};

export default { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, reactivateProduct };
