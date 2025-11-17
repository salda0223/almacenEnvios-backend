import express from "express";
import saleController from "../controllers/saleController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, (req, res, next) => saleController.getSales(req, res, next));
router.post("/", protect, (req, res, next) => saleController.createSale(req, res, next));

export default router;
