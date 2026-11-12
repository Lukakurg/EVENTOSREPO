const Joi = require("joi");

const eventValidation = Joi.object({
    nombre: Joi.string().required(),
    direccion: Joi.string().required(),
    fecha: Joi.date().required(),
    hora: Joi.string().required(),
    descripcion: Joi.string().optional(),
    costo: Joi.number().min(0).required(),
    categoryId: Joi.string().required(),
    imagen: Joi.string().uri().allow("").optional(),
    lat: Joi.number().min(-90).max(90).allow(null).optional(),
    lng: Joi.number().min(-180).max(180).allow(null).optional(),
});



module.exports = eventValidation;