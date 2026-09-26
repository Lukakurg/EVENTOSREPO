
const pingController = (req, res) => {
    res.status(200).send("pong")
};
const healthController = (req, res) => {
    res.status(200).send("OK");
};

const getExternalEvents = require("../services/ticketmaster.service");

const eventosExternosController = async (req, res) => {
    try {
        const eventos = await getExternalEvents(req.query.countryCode || "UY");
        res.status(200).json(eventos);
    } catch (error) {
        res.status(500).json({ message: "Error al traer eventos externos", error: error.message });
    }
};

module.exports = {
    pingController,
    healthController,
    eventosExternosController   
};