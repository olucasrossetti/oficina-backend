// models/Peca.js
const mongoose = require('mongoose');

const PecaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  fabricante: {
    type: String,
    required: true,
  },
  fornecedor: {
    type: String,
    required: true,
  },
  setor: {
    type: String,
    required: true,
  },
  dataEntrada: {
    type: Date,
    required: true,
  },
  observacoes: {
    type: String,
  },
  estoqueAtual: {
    type: Number,
    required: true,
    default: 0,
  },
  precoTabela: {
    type: Number,
    required: true,
    default: 0.0,
  },
  descontoFornecedor: {
    type: Number,
    required: true,
    default: 0.0,
  },
  precoCompra: {
    type: Number,
    required: true,
    default: 0.0,
  },
  lucro: {
    type: Number,
    required: true,
    default: 0.0,
  },
  precoVenda: {
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
