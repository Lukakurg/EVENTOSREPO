const axios = require("axios");
const connectToRedis = require("./redis.service");

const URL_COTIZACION = "https://open.er-api.com/v6/latest/UYU";
const MONEDAS = ["USD", "EUR", "ARS", "BRL"];

const REDIS_KEY = "cotizacion:UYU";
const CACHE_SEGUNDOS = 6 * 60 * 60;

const getCotizaciones = async () => {
    const redisClient = connectToRedis();
    const cached = await redisClient.get(REDIS_KEY);
    if (cached) return cached;

    const { data } = await axios.get(URL_COTIZACION, { timeout: 10000 });
    if (data.result !== "success") {
        throw new Error("El servicio de cotizaciones no respondio correctamente");
    }

    const tasas = Object.fromEntries(MONEDAS.map(moneda => [moneda, data.rates[moneda]]));
    const resultado = { base: "UYU", tasas, actualizado: data.time_last_update_utc };

    await redisClient.set(REDIS_KEY, JSON.stringify(resultado), { ex: CACHE_SEGUNDOS });
    return resultado;
};

module.exports = { getCotizaciones, MONEDAS };
