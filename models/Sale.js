import mongoose from "mongoose";

const SaleSchema = new mongoose.Schema({
    client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }],
    totalValue: { type: Number, required: true },
    shippingCost: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

export default mongoose.model("Sale", SaleSchema);

