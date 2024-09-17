// models/Client.js
const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema(
  {
    tipoPessoa: {
      type: String,
      enum: ['Física', 'Jurídica'],
      required: true,
    },
    nome: {
      type: String,
      required: true,
    },
    cpfCnpj: {
      type: String,
      unique: true,
    },
    telefone: {
      type: String,
    },
    endereco: {
      type: String,
    },
    observacoes: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Client', ClientSchema);
