// models/Peca.js
const mongoose = require('mongoose');

const PecaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
  },
  quantidade: {
    type: Number,
    required: true,
    default: 0,
  },
  preco: {
    type: Number,
    required: true,
    default: 0.0,
  },
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Peca', PecaSchema);
