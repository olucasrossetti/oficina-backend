// routes/pecas.js
const express = require('express');
const router = express.Router();
const Peca = require('../models/Peca');
const verifyToken = require('../middleware/auth');

// Criar uma nova peça
router.post('/', verifyToken, async (req, res) => {
  try {
    const novaPeca = new Peca(req.body);
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
  if (req.body.descricao != null) {
    res.peca.descricao = req.body.descricao;
  }
  if (req.body.quantidade != null) {
    res.peca.quantidade = req.body.quantidade;
  }
  if (req.body.preco != null) {
    res.peca.preco = req.body.preco;
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
