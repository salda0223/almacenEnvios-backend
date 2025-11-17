import productRepository from "../repositories/productRepository.js";
import AppError from "../errors/AppError.js";

class ProductService {

    async getAllProducts() {
        return await productRepository.findAll();
    }

    async getProductById(id) {
        const product = await productRepository.findById(id);
        if (!product) throw new AppError("Producto no encontrado", 404);
        return product;
    }

    async createProduct(data) {
        return await productRepository.create(data);
    }

    async updateProduct(id, data) {
        const updated = await productRepository.update(id, data);
        if (!updated) throw new AppError("Producto no encontrado", 404);
        return updated;
    }

    async deleteProduct(id) {
        const deleted = await productRepository.softDelete(id);
        if (!deleted) throw new AppError("Producto no encontrado", 404);
        return { message: "Producto eliminado correctamente" };
    }

    async reactivateProduct(id) {
        const reactivated = await productRepository.reactivate(id);
        if (!reactivated) throw new AppError("Producto no encontrado o ya activo", 404);
        return { message: "Producto reactivado correctamente" };
    }
}

export default new ProductService();
