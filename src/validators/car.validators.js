const Joi = require('@hapi/joi');

const currentYear = (new Date()).getFullYear();

const newCarValidator = Joi.object({
    make: Joi.string()
        .required(),
    model: Joi.string()
        .required(),
    year: Joi.number()
        .min(1900)
        .max(currentYear)
        .required(),
    color: Joi.string()
        .required(),
    vin: Joi.string()
        .required(),
});

const updateCarValidator = Joi.object({
    make: Joi.string(),
    model: Joi.string(),
    year: Joi.number()
        .min(1900)
        .max(currentYear),
    color: Joi.string(),
    vin: Joi.string(),
}).min(1);

const searchQueryValidator = Joi.object({
    make: Joi.string(),
    model: Joi.string(),
    year: Joi.number()
        .min(1900)
        .max(currentYear),
    color: Joi.string(),
    vin: Joi.string(),
});

module.exports = {
    newCarValidator,
    updateCarValidator,
    searchQueryValidator,
};
