// models/Vehicle.js
const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema(
  {
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      required: true,
    },
    placa: {
      type: String,
      unique: true,
    },
    marca: {
      type: String,
    },
    modelo: {
      type: String,
    },
    anoFabricacao: {
      type: Number,
    },
    anoModelo: {
      type: Number,
    },
    observacoes: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Vehicle', VehicleSchema);
