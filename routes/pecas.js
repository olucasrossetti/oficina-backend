// routes/pecas.js
const express = require('express');
const router = express.Router();
const Peca = require('../models/Peca');
const verifyToken = require('../middleware/auth');

// Criar uma nova peça
router.post('/', verifyToken, async (req, res) => {
  try {
    const novaPeca = new Peca({
      nome: req.body.nome,
      categoria: req.body.categoria,
      fabricante: req.body.fabricante,
      fornecedor: req.body.fornecedor,
      setor: req.body.setor,
      dataEntrada: req.body.dataEntrada,
      observacoes: req.body.observacoes,
      estoqueAtual: req.body.estoqueAtual,
      precoTabela: req.body.precoTabela,
      descontoFornecedor: req.body.descontoFornecedor,
      precoCompra: req.body.precoCompra,
      lucro: req.body.lucro,
      precoVenda: req.body.precoVenda
    });
    const pecaSalva = await novaPeca.save();
    res.status(201).json(pecaSalva);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obter todas as peças
router.get('/', verifyToken, async (req, res) => {
  try {
    const pecas = await Peca.find();
    res.json(pecas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obter uma peça pelo ID
router.get('/:id', verifyToken, getPeca, (req, res) => {
  res.json(res.peca);
});

// Atualizar uma peça
router.put('/:id', verifyToken, getPeca, async (req, res) => {
  if (req.body.nome != null) {
    res.peca.nome = req.body.nome;
  }
  if (req.body.categoria != null) {
    res.peca.categoria = req.body.categoria;
  }
  if (req.body.fabricante != null) {
    res.peca.fabricante = req.body.fabricante;
  }
  if (req.body.fornecedor != null) {
    res.peca.fornecedor = req.body.fornecedor;
  }
  if (req.body.setor != null) {
    res.peca.setor = req.body.setor;
  }
  if (req.body.dataEntrada != null) {
    res.peca.dataEntrada = req.body.dataEntrada;
  }
  if (req.body.observacoes != null) {
    res.peca.observacoes = req.body.observacoes;
  }
  if (req.body.estoqueAtual != null) {
    res.peca.estoqueAtual = req.body.estoqueAtual;
  }
  if (req.body.precoTabela != null) {
    res.peca.precoTabela = req.body.precoTabela;
  }
  if (req.body.descontoFornecedor != null) {
    res.peca.descontoFornecedor = req.body.descontoFornecedor;
  }
  if (req.body.precoCompra != null) {
    res.peca.precoCompra = req.body.precoCompra;
  }
  if (req.body.lucro != null) {
    res.peca.lucro = req.body.lucro;
  }
  if (req.body.precoVenda != null) {
    res.peca.precoVenda = req.body.precoVenda;
  }

  try {
    const pecaAtualizada = await res.peca.save();
    res.json(pecaAtualizada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Deletar uma peça
router.delete('/:id', verifyToken, getPeca, async (req, res) => {
  try {
    await res.peca.remove();
    res.json({ message: 'Peça removida com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware para obter a peça pelo ID
async function getPeca(req, res, next) {
  let peca;
  try {
    peca = await Peca.findById(req.params.id);
    if (peca == null) {
      return res.status(404).json({ message: 'Peça não encontrada' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.peca = peca;
  next();
}

module.exports = router;
