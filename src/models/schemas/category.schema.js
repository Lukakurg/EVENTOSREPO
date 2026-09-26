const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
    titulo: {type: String, required: true},
})

module.exports = categorySchema