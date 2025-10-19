import express from "express";
import { getSales, createSale } from "../controllers/saleController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", protect, getSales);
router.post("/", protect, createSale);

export default router;
