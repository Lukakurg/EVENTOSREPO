require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const loggerMiddleware = require("./middlewares/logger.middleware")
const authMiddleware = require("./middlewares/auth.middleware")
const dbMiddleware = require("./middlewares/db.middleware");

const uploadsRouter = require("./routes/uploads.router");
const iaRouter = require("./routes/ia.router");
const router = require("./routes/private.router");
const publicRouter = require("./routes/public.router")
const authRouter = require("./routes/auth.router");
const {generalLimiter} = require("./middlewares/rateLimit.middleware");
const connecToRedis = require("./services/redis.service");


(async () => {
  try {
    await connecToRedis();
    console.log("Conexion a redis establecida correctamente");
    
  } catch (error) {
    console.log("Ocurrio un error al conectarse a redis", error);
    process.exit();
  }
})();


app.use(loggerMiddleware);
app.use(express.json());
app.use(morgan("dev"));

app.use(cors());


app.use("/public", publicRouter);

app.use(dbMiddleware);


app.use("/v1/auth", authRouter);
app.use(authMiddleware);
app.use(generalLimiter);
app.use("/v1", router);

app.use("/v1/uploads", uploadsRouter);

app.use("/v1/ai", iaRouter);


module.exports = app;



if(require.main === module) {
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Listen & serve PORT: ${PORT}`);
  });
}