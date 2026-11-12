const express = require("express");
const publicRouter = express.Router();

const {
  healthController,
  pingController,
  cotizacionController
} = require("../controllers/public.controller");
const queryMiddleware = require("../middlewares/query.middleware");
const cotizacionSchema = require("./validations/cotizacion.validation");

publicRouter.get("/health", healthController);
publicRouter.get("/ping", pingController);
publicRouter.get("/cotizacion", queryMiddleware(cotizacionSchema), cotizacionController);


module.exports = publicRouter;
