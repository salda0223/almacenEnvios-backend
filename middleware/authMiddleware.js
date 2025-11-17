import jwt from "jsonwebtoken";
import AppError from "../errors/AppError.js";
import { setCache, getCache } from "../utils/cache.js";
import userRepository from "../repositories/userRepository.js";


export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new AppError("No autorizado. Token no proporcionado.", 401));
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.id;

    let user = getCache(userId);

    if (!user) {
      user = await userRepository.findById(userId);

      if (!user) {
        return next(new AppError("Usuario no autorizado.", 401));
      }

      setCache(userId, user.toObject(), 500000);
    }

    req.user = user;
    next();

  } catch (error) {
    console.error(error);
    next(new AppError("Token inválido o expirado.", 403));
  }
};

export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return next(new AppError("No autorizado. Falta info del usuario.", 401));
  }

  if (req.user.role !== "admin") {
    return next(new AppError("Acceso prohibido. Solo administradores.", 403));
  }

  next();
};
