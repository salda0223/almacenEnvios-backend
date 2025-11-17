import saleRepository from "../repositories/saleRepository.js";
import AppError from "../errors/AppError.js";

class SaleService {

    async getAllSales() {
        return await saleRepository.findAll();
    }

    async getSaleById(id) {
        const sale = await saleRepository.findById(id);
        if (!sale) throw new AppError("Venta no encontrada", 404);
        return sale;
    }

    async createSale(data) {
        return await saleRepository.create(data);
    }

    async deleteSale(id) {
        const deleted = await saleRepository.softDelete(id);
        if (!deleted) throw new AppError("Venta no encontrada", 404);
        return { message: "Venta eliminada correctamente" };
    }

    async reactivateSale(id) {
        const reactivated = await saleRepository.reactivate(id);
        if (!reactivated) throw new AppError("Venta no encontrada o ya activa", 404);
        return { message: "Venta reactivada correctamente" };
    }
}

export default new SaleService();
