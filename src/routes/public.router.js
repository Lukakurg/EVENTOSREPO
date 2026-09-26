const express = require("express");
const publicRouter = express.Router();

const {
  healthController,
  pingController,
  eventosExternosController
} = require("../controllers/public.controller");

publicRouter.get("/health", healthController);
publicRouter.get("/ping", pingController);
publicRouter.get("/events-ext", eventosExternosController)


module.exports = publicRouter;