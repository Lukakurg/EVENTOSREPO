const Joi = require("joi");
const { MONEDAS } = require("../../services/cotizacion.service");

// GET /public/cotizacion?moneda=USD  (moneda es opcional)
const cotizacionValidation = Joi.object({
    moneda: Joi.string().uppercase().valid(...MONEDAS),
});

module.exports = cotizacionValidation;
