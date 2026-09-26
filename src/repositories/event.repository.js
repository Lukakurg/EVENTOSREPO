const Event = require("../models/event.model");

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
    const newEvent = new Event({
        ...eventData,
        userId
    });
    await newEvent.save();
    return newEvent;
};

const deleteEvent = async (eventId, userId) => {
    return await Event.deleteOne({_id: eventId, userId: userId})
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
    }
    return event;
};

const getEventPaginated = async(userId, page = 1, limit = 5) => {
    const skip = (page -1) * limit;

    const [events, total] = await Promise.all([
        Event.find({userId}).skip(skip).limit(limit),
        Event.countDocuments({userId})
    ])

    return {
      data: events,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
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
