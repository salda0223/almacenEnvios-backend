import Sale from "../models/Sale.js";
import Product from "../models/Product.js";

const calculateShipping = (totalWeight, totalValue, paymentMethod) => {
    let shippingCost = 0;

    if(totalWeight <= 500) shippingCost = 40000;
    else if(totalWeight <= 750) shippingCost = 80000;
    else if(totalWeight <= 1000) shippingCost = 100000;
    else shippingCost = 100000 + Math.ceil((totalWeight - 1000) / 10) * 500;

    if(totalValue >= 300000 && totalValue <= 600000) shippingCost *= 0.8;
    else if(totalValue > 600000 && totalValue <= 1000000) shippingCost *= 0.65;
    else if(totalValue > 1000000) shippingCost *= 0.5;

    if(paymentMethod === "tarjeta") shippingCost = 0;
    else if(paymentMethod === "efectivo") {
        if(totalValue > 500000) shippingCost = 0;
        else if(totalValue >= 300000 && totalValue <= 500000) shippingCost *= 0.5;
    }

    return shippingCost;
};

export const getSales = async (req, res) => {
    const sales = await Sale.find({}).populate("client products");
    res.json(sales);
};

export const createSale = async (req, res) => {
    const { clientId, productIds, paymentMethod } = req.body;

    const products = await Product.find({ _id: { $in: productIds } });

    const totalValue = products.reduce((acc, p) => acc + p.price, 0);
    const totalWeight = products.reduce((acc, p) => acc + p.weight, 0);
    const shippingCost = calculateShipping(totalWeight, totalValue, paymentMethod);

    const sale = await Sale.create({
        client: clientId,
        products: productIds,
        totalValue,
        shippingCost,
    });

    res.status(201).json(sale);
};
