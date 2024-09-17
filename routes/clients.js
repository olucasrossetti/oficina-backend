// routes/clients.js
const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const verifyToken = require('../middleware/auth');

// Obter todos os clientes ou pesquisar por nome
router.get('/', verifyToken, async (req, res) => {
    try {
      let query = {};
      if (req.query.nome) {
        query.nome = { $regex: req.query.nome, $options: 'i' }; // Case-insensitive
      }
      const clients = await Client.find(query);
      res.json(clients);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// Obter um cliente específico
router.get('/:id', verifyToken, getClient, (req, res) => {
  res.json(res.client);
});

// Criar um novo cliente
router.post('/', verifyToken, async (req, res) => {
  const {
    tipoPessoa,
    nome,
    cpfCnpj,
    telefone,
    endereco,
    observacoes,
  } = req.body;

  const client = new Client({
    tipoPessoa,
    nome,
    cpfCnpj,
    telefone,
    endereco,
    observacoes,
  });

  try {
    const newClient = await client.save();
    res.status(201).json(newClient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Atualizar um cliente
router.put('/:id', verifyToken, getClient, async (req, res) => {
  const {
    tipoPessoa,
    nome,
    cpfCnpj,
    telefone,
    endereco,
    observacoes,
  } = req.body;

  if (tipoPessoa != null) res.client.tipoPessoa = tipoPessoa;
  if (nome != null) res.client.nome = nome;
  if (cpfCnpj != null) res.client.cpfCnpj = cpfCnpj;
  if (telefone != null) res.client.telefone = telefone;
  if (endereco != null) res.client.endereco = endereco;
  if (observacoes != null) res.client.observacoes = observacoes;

  try {
    const updatedClient = await res.client.save();
    res.json(updatedClient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deletar um cliente
router.delete('/:id', verifyToken, getClient, async (req, res) => {
  try {
    await res.client.remove();
    res.json({ message: 'Cliente deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware para obter um cliente pelo ID
async function getClient(req, res, next) {
  let client;
  try {
    client = await Client.findById(req.params.id);
    if (client == null) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.client = client;
  next();
}

module.exports = router;
