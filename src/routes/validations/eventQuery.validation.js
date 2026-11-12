const Joi = require("joi");

const eventQueryValidation = Joi.object({
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(1000),
    q: Joi.string().trim().max(50).allow(""),
    categoryId: Joi.string().hex().length(24).allow(""),
    costo: Joi.string().valid("gratis", "pagos").allow(""),
    cuando: Joi.string().valid("proximos", "pasados").allow(""),
});

module.exports = eventQueryValidation;
