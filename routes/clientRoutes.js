import express from "express";
import clientController from "../controllers/clientController.js";
import * as schemas from "../validations/clientValidation.js";
import { protect } from "../middleware/authMiddleware.js";
import { joiValidate } from "../middleware/joiValidate.js";

const router = express.Router();

router.get(
  "/",
  protect,
  (req, res, next) => clientController.getClients(req, res, next)
);

router.get(
  "/:id",
  protect,
  (req, res, next) => clientController.getClientById(req, res, next)
);

router.post(
  "/",
  joiValidate(schemas.createClient),
  (req, res, next) => clientController.createClient(req, res, next)
);

router.put(
  "/:id",
  protect,
  (req, res, next) => clientController.updateClient(req, res, next)
);

router.delete(
  "/:id",
  protect,
  (req, res, next) => clientController.deleteClient(req, res, next)
);

export default router;
