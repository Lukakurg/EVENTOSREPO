const Joi = require("joi");
const { MONEDAS } = require("../../services/cotizacion.service");

const cotizacionValidation = Joi.object({
    moneda: Joi.string().uppercase().valid(...MONEDAS),
});

module.exports = cotizacionValidation;
