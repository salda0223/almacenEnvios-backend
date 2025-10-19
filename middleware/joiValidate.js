import AppError from "../errors/AppError.js";

export const joiValidate = (schema) => {
    return ({ params, query, body }, res, next) => {
        const { error } = schema.validate({ ...params, ...query, ...body });
        if (error) {
            const messages = error.details.map((d) => d.message);
            return next(new AppError(messages.join("; "), 400));
        }
        next();

    };
};
