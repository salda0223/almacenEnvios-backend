import Joi from "joi";

export const SaleSchema = Joi.object({
    client: Joi.string().required().messages({
        "string.empty" : "Debe especificar un cliente valido",

    }),
    product: Joi.array()
    .items(
        Joi.object({
            product: Joi.string().required(),
            quantify: Joi.number().interger.min(1).required(),

        })
    )
    .min(1)
    .required()
    .messages({
        "array.min": "Debe incluir al menos un producto en la venta",  
    }),

    total: Joi.number().positive().required().messages({
        "number.base" : "El total debe ser un numero",
        "number.positive" : "El total debe ser mayor que cero",

    }),

    date: Joi.date().default(() => new Date(), "Fecha actual"),
    isActive: Joi.boolean().default(true),

});

