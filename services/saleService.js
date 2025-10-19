import saleRepository from "../repositories/saleRepository.js";
import AppError from "../errors/AppError.js";

const getAllSales = async () => await saleRepository.findAll();
const getSaleById = async (id) => {
  const sale = await saleRepository.findById(id);
  if (!sale) throw new AppError("Venta no encontrada", 404);
  return sale;
};
const createSale = async (data) => await saleRepository.create(data);
const deleteSale = async (id) => {
  const deleted = await saleRepository.softDelete(id);
  if (!deleted) throw new AppError("Venta no encontrada", 404);
  return { message: "Venta eliminada correctamente" };
};
const reactivateSale = async (id) => {
  const reactivated = await saleRepository.reactivate(id);
  if (!reactivated) throw new AppError("Venta no encontrada o ya activa", 404);
  return { message: "Venta reactivada correctamente" };
};

export default { getAllSales, getSaleById, createSale, deleteSale, reactivateSale };
