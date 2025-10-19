import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import saleRoutes from "./routes/saleRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes); 


app.use("/api/products", protect, productRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/sales", protect, saleRoutes);

app.get("/", (req, res) => {
  res.send("Servidor backend funcionando");
});

app.use(errorHandler);

const PORT = process.env.PORT || 9000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado a MongoDB");
    app.listen(PORT, () => console.log(` Servidor corriendo en puerto ${PORT}`));
  })
  .catch((err) => console.log(err));
