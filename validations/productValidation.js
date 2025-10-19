import Joi from "joi";

export const ProductSchema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
        "string.empty": "El nombre del producto es obligatorio",

    }),
    
    price: Joi.number().positive().required().messages({
        "number.base": "El precio debe ser un numero",
        "number.positive": "El precio debe ser mayor que cero",

    }),

    weight: Joi.number().integer().min(0).required().messages({
        "number.base": "El peso del producto debe ser en KG",
        "number.min": "El peso no puede ser negativo",

    }),
    description: Joi.string().allow("").optional,
    isActive: Joi.boolean().default(true),

});


