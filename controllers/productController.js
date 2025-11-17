import Product from "../models/Product.js";

class ProductController {

    async getProducts(req, res) {
        const products = await Product.find({});
        res.json(products);
    }

    async createProduct(req, res) {
        const { name, price, weight } = req.body;
        const product = await Product.create({ name, price, weight });
        res.status(201).json(product);
    }
}

export default new ProductController();
