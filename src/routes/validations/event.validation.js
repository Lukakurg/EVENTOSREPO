const Joi = require("joi");

const eventValidation = Joi.object({
    nombre: Joi.string().required(),
    direccion: Joi.string().required(),
    fecha: Joi.date().required(),
    hora: Joi.string().required(),
    descripcion: Joi.string().optional(),
    costo: Joi.number().min(0).required(),
    categoryId: Joi.string().required()
});



module.exports = eventValidation;