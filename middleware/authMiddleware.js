import jwt from "jsonwebtoken";
import AppError from "../errors/AppError.js";
import { setCache, getCache } from "../utils/cache.js";
import UserRepository from "../repositories/userRepository.js";


export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log(req.url)


  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("No autorizado. Token no proporcionado.", 401));
  }

  const { 1: token } = authHeader.split(" ");

  try {
   
    let user = jwt.verify(token, process.env.JWT_SECRET);

    if (!getCache(user.id)) {
      user = await UserRepository.findById(user.id);

      if (!user) {
        return next(new AppError("Usuario no autorizado", 401))
      }

      setCache(user.id, user.toObject(), 500000)
    }


    req.user = user;

    next();
  } catch (error) {
   console.error(error)
    next(new AppError("Token inválido o expirado.", 403));
  }
};

export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return next(new AppError("No autorizado. Falta información del usuario.", 401));
  }

  if (req.user.role !== "admin") {
    return next(new AppError("Acceso prohibido. Solo administradores pueden realizar esta acción.", 403));
  }

  next();
};
