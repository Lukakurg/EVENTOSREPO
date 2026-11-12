
const pingController = (req, res) => {
    res.status(200).send("pong")
};
const healthController = (req, res) => {
    res.status(200).send("OK");
};

const { getCotizaciones } = require("../services/cotizacion.service");

// GET /public/cotizacion           -> todas las tasas
// GET /public/cotizacion?moneda=USD -> solo la de esa moneda
const cotizacionController = async (req, res) => {
    try {
        const cotizacion = await getCotizaciones();
        const moneda = req.query.moneda?.toUpperCase();

        if (moneda) {
            return res.status(200).json({
                base: cotizacion.base,
                moneda,
                tasa: cotizacion.tasas[moneda],
                actualizado: cotizacion.actualizado
            });
        }
        res.status(200).json(cotizacion);
    } catch (error) {
        // 502: el que fallo fue el servicio externo, no nuestro servidor
        res.status(502).json({ message: "No se pudo obtener la cotizacion", error: error.message });
    }
};

module.exports = {
    pingController,
    healthController,
    cotizacionController
};
