const Event = require("../models/event.model");
const connectToRedis = require("../services/redis.service");


// La clave incluye los filtros: si no, "rock" y "jazz" compartirian el mismo cache.
// Sigue empezando con userId:...-events- para que _invalidateEventsCache la borre
const _getEventsRedisKey = (userId, page, limit, filtros = {}) =>
    `userId:${userId}-events-page:${page}-limit:${limit}-f:${JSON.stringify(filtros)}`;

// Escapa los caracteres especiales de una expresion regular: si el usuario busca
// "a.b" o "(", se busca ese texto literal y no se rompe la consulta
const _escaparRegex = (texto) => texto.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Inicio del dia de hoy en UTC (las fechas se guardan a medianoche UTC)
const _hoyUTC = () => new Date(new Date().toISOString().slice(0, 10));

// Arma el filtro de Mongo a partir de los parametros de la query.
// Siempre filtra por userId: cada usuario ve solo sus eventos
const _armarFiltro = (userId, { q, categoryId, costo, cuando } = {}) => {
    const filtro = { userId };

    if (q) {
        const texto = new RegExp(_escaparRegex(q.trim()), "i"); // "i" = sin distinguir mayusculas
        filtro.$or = [{ nombre: texto }, { direccion: texto }];
    }
    if (categoryId) filtro.categoryId = categoryId;

    if (costo === "gratis") filtro.costo = 0;
    if (costo === "pagos") filtro.costo = { $gt: 0 };

    if (cuando === "proximos") filtro.fecha = { $gte: _hoyUTC() };
    if (cuando === "pasados") filtro.fecha = { $lt: _hoyUTC() };

    return filtro;
};
const _invalidateEventsCache = async (userId) => {
    const redisClient = connectToRedis();
    let cursor = "0";
    do {
        const [next, keys] = await redisClient.scan(cursor, { match: `userId:${userId}-events-*`, count: 100 });
        if (keys.length) await redisClient.del(...keys);
        cursor = String(next);
    } while (cursor !== "0");
};

const getEvent = async(userId) => {
    const event = await Event.find({
        userId: userId
    });

    return event;
}

const findEvent = async(eventId, userId) => {
    return await Event.findOne({
        _id:eventId,
        userId:userId
    })
};

const createEvent = async (eventData, userId) => {
    const newEvent = new Event({...eventData, userId});
    await newEvent.save();

    await _invalidateEventsCache(userId);

    return newEvent;
};

const deleteEvent = async (eventId, userId) => {
   const result = await Event.deleteOne({_id: eventId, userId: userId});
    await _invalidateEventsCache(userId);   
    return result;
};

const updateEvent = async (eventId, userId, payload) => {
    const event = await Event.findOne({
        _id:eventId,
        userId: userId
    });

    console.log(event);
    
    if(event){
        Object.entries(payload).forEach(([key, value]) => {
            event[key] = value;
        })
        await event.save();
         await _invalidateEventsCache(userId);
    }
    return event;
};

const getEventPaginated = async(userId, page = 1, limit = 5, filtros = {}) => {
    const redisClient = connectToRedis();
    // Solo los filtros que vienen con valor (asi "sin filtros" siempre da la misma clave)
    const filtrosActivos = Object.fromEntries(Object.entries(filtros).filter(([, valor]) => valor));
    const redisKey = _getEventsRedisKey(userId, page, limit, filtrosActivos);
    let cached = await redisClient.get(redisKey);

    if (cached) {
        console.log("obteniendo la informacion por Redis");
        return cached;
    }

    console.log("obteniendo la informacion por Mongo db");
    const skip = (page - 1) * limit;
    const filtro = _armarFiltro(userId, filtrosActivos);
    const [events, total] = await Promise.all([
        // Ordenados por fecha (el mas proximo primero); _id desempata para que la paginacion sea estable
        Event.find(filtro).sort({ fecha: 1, _id: 1 }).skip(skip).limit(limit),
        Event.countDocuments(filtro)
    ]);

    const result = {
      data: events,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    };

    redisClient.set(redisKey, JSON.stringify(result), {ex: 3600});
    return result;
}

const countEventsById = async (userId) => Event.countDocuments({userId});

const countEventByCategoryId = async(categoryId) => Event.countDocuments({categoryId})



module.exports = {
    getEvent,
    createEvent,
    deleteEvent,
    updateEvent,
    findEvent,
    getEventPaginated,
    countEventsById,
    countEventByCategoryId
}
