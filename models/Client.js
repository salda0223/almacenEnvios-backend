import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cedula: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  isActive: { type: Boolean, default: true },
});

export default mongoose.model("Client", ClientSchema);
