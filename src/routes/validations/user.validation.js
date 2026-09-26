const Joi = require("joi");

const signupValidation = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    username: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(20).required(),
});

const loginValidation = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(3).max(20).required(),
});



module.exports = { signupValidation, loginValidation };