import express from "express";
import productController from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  (req, res, next) => productController.getProducts(req, res, next)
);

router.post(
  "/",
  protect,
  (req, res, next) => productController.createProduct(req, res, next)
);

export default router;
