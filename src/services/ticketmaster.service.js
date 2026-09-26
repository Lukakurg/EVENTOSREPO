const getExternalEvents = async (countryCode = "UY") => {
    const apiKey = process.env.TICKETMASTER_API_KEY;
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&countryCode=${countryCode}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data._embedded) {
        return [];
    }

    return data._embedded.events.map(evento => ({
        nombre: evento.name,
        fecha: evento.dates.start.localDate,
        hora: evento.dates.start.localTime,
        direccion: evento._embedded?.venues?.[0]?.name || "Sin lugar",
        costo: null,
        link: evento.url
    }));
};

module.exports = getExternalEvents;