const express = require('express');
const router = express.Router();
const { obtenerConfiguracion } = require('../controllers/configuracion.controller');

router.get('/', obtenerConfiguracion);

module.exports = router;
