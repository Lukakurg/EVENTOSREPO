const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
    nombre: {type: String, required: true},
  direccion: {type: String, required: true},
  fecha: {type: Date, required: true},
  hora: {type: String, required: true},
  descripcion:{type: String},
  costo: {type: Number, required: true},
  categoryId: {type: mongoose.Schema.Types.ObjectId, ref:"Category"},
  imagen: {type: String},
  lat: {type: Number, min: -90, max: 90},
  lng: {type: Number, min: -180, max: 180}
})

module.exports = eventSchema