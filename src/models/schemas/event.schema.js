const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
    nombre: {type: String, required: true},
  direccion: {type: String, required: true},
  fecha: {type: Date, required: true},
  hora: {type: String, required: true},
  descripcion:{type: String},
  costo: {type: Number, required: true},
  categoryId: {type: mongoose.Schema.Types.ObjectId, ref:"Category"}
})

module.exports = eventSchema