const axios = require("axios");
const connectToRedis = require("./redis.service");

// Servicio externo gratuito y sin clave: cotizaciones con base en pesos uruguayos
const URL_COTIZACION = "https://open.er-api.com/v6/latest/UYU";
const MONEDAS = ["USD", "EUR", "ARS", "BRL"];

// La cotizacion se actualiza una vez por dia: con 6 horas de cache en Redis
// casi nunca se llama al servicio externo
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

    // Nos quedamos solo con las monedas que usa la app
    const tasas = Object.fromEntries(MONEDAS.map(moneda => [moneda, data.rates[moneda]]));
    const resultado = { base: "UYU", tasas, actualizado: data.time_last_update_utc };

    await redisClient.set(REDIS_KEY, JSON.stringify(resultado), { ex: CACHE_SEGUNDOS });
    return resultado;
};

module.exports = { getCotizaciones, MONEDAS };
