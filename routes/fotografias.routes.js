const express = require('express');
const router = express.Router();
const {
  subirFoto,
  obtenerGaleria,
  actualizarEstadoFoto
} = require('../controllers/fotografias.controller');

// Subir una nueva foto
router.post('/', subirFoto);

// Galería pública
router.get('/', obtenerGaleria);

// Cambiar estado de foto (admin)
router.put('/:id/estado', actualizarEstadoFoto);

module.exports = router;
