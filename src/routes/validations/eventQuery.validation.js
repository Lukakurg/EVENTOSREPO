const Joi = require("joi");

// Parametros que acepta GET /v1/events (todos opcionales)
// Ej: /v1/events?q=rock&categoryId=...&costo=gratis&cuando=proximos&page=1&limit=5
const eventQueryValidation = Joi.object({
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(1000),
    q: Joi.string().trim().max(50).allow(""),               // busca en nombre o direccion
    categoryId: Joi.string().hex().length(24).allow(""),    // un ObjectId de Mongo
    costo: Joi.string().valid("gratis", "pagos").allow(""),
    cuando: Joi.string().valid("proximos", "pasados").allow(""),
});

module.exports = eventQueryValidation;
