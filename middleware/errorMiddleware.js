import AppError from "../errors/AppError.js";

export const errorHandler = (err, req, res, next) => {
  console.error(" ERROR:", err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "Token inválido o corrupto" });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(403).json({ error: "Sesión expirada, inicia sesión nuevamente" });
  }

  res.status(500).json({ error: "Error interno del servidor" });
};
