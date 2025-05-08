const express = require('express');
const router = express.Router();
const {
  votar,
  promediosPorFoto
} = require('../controllers/votaciones.controller');

// Votar por una foto
router.post('/', votar);

// Obtener promedios por ID de foto
router.get('/promedios/:fotoId', promediosPorFoto);

module.exports = router;
