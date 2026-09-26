const Joi = require("joi");

const categoryValidation = Joi.object({
    titulo: Joi.string().required(),
   
});



module.exports = categoryValidation;