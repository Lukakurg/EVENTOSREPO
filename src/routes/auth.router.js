const express = require('express');
const authRouter = express.Router();
const { postAuthLogin, postAuthRegister } = require('../controllers/auth.controller');
const payloadMiddleware = require('../middlewares/payload.middleware');
const { signupValidation, loginValidation } = require('./validations/user.validation');

authRouter.post("/signup", payloadMiddleware(signupValidation), postAuthRegister);
authRouter.post("/login", payloadMiddleware(loginValidation), postAuthLogin);

module.exports = authRouter;