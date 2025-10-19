import Joi from "joi";

export const createClient = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "string.empty": "El nombre es obligatorio",
    "string.min": "El nombre debe tener al menos 3 caracteres",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Debe ingresar un correo válido",
  }),

  cedula: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
    "string.pattern.base": "La cédula debe tener 10 dígitos numéricos",
  }),

  phone: Joi.string().allow("").optional(),
  address: Joi.string().allow("").optional(),
  isActive: Joi.boolean().default(true),
});
