import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    weight: { type: Number, required: true }, // en kg
});

export default mongoose.model("Product", ProductSchema);

