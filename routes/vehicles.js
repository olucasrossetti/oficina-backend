// routes/vehicles.js
const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');
const verifyToken = require('../middleware/auth');

// Obter todos os veículos
router.get('/', verifyToken, async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate('cliente');
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obter um veículo específico
router.get('/:id', verifyToken, getVehicle, (req, res) => {
  res.json(res.vehicle);
});

// Criar um novo veículo
router.post('/', verifyToken, async (req, res) => {
  const {
    cliente,
    placa,
    marca,
    modelo,
    anoFabricacao,
    anoModelo,
    observacoes,
  } = req.body;

  const vehicle = new Vehicle({
    cliente,
    placa,
    marca,
    modelo,
    anoFabricacao,
    anoModelo,
    observacoes,
  });

  try {
    const newVehicle = await vehicle.save();
    res.status(201).json(newVehicle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Atualizar um veículo
router.put('/:id', verifyToken, getVehicle, async (req, res) => {
  const {
    cliente,
    placa,
    marca,
    modelo,
    anoFabricacao,
    anoModelo,
    observacoes,
  } = req.body;

  if (cliente != null) res.vehicle.cliente = cliente;
  if (placa != null) res.vehicle.placa = placa;
  if (marca != null) res.vehicle.marca = marca;
  if (modelo != null) res.vehicle.modelo = modelo;
  if (anoFabricacao != null) res.vehicle.anoFabricacao = anoFabricacao;
  if (anoModelo != null) res.vehicle.anoModelo = anoModelo;
  if (observacoes != null) res.vehicle.observacoes = observacoes;

  try {
    const updatedVehicle = await res.vehicle.save();
    res.json(updatedVehicle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deletar um veículo
router.delete('/:id', verifyToken, getVehicle, async (req, res) => {
  try {
    await res.vehicle.remove();
    res.json({ message: 'Veículo deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware para obter um veículo pelo ID
async function getVehicle(req, res, next) {
  let vehicle;
  try {
    vehicle = await Vehicle.findById(req.params.id).populate('cliente');
    if (vehicle == null) {
      return res.status(404).json({ message: 'Veículo não encontrado' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.vehicle = vehicle;
  next();
}

module.exports = router;
