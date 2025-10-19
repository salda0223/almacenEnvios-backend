import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
    const products = await Product.find({});
    res.json(products);
};

export const createProduct = async (req, res) => {
    const { name, price, weight } = req.body;
    const product = await Product.create({ name, price, weight });
    res.status(201).json(product);
};


