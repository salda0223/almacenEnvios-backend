import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();


router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor" });
  }
});


router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor" });
  }
});


router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updateUser);
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor" });
  }
});


router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor" });
  }
});


router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
