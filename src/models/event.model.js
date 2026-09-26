const mongoose = require("mongoose");
const eventSchema = require("./schemas/event.schema")

const Event = mongoose.model("Event", eventSchema)
module.exports = Event;
