const express = require('express');
const router = express.Router();
const {
  votar,
  ranking,
  obtenerVotosPorFoto,
  verificarVotoPorIP,
  eliminarVotoPorIP
} = require('../controllers/votaciones.controller');

const { obtenerIP } = require('../middleware/ip.middleware');

router.post('/', obtenerIP, votar);
router.get('/ranking', ranking);
router.get('/:foto_id', obtenerVotosPorFoto); 
router.get('/mis-votos/:foto_id', obtenerIP, verificarVotoPorIP); 
router.delete('/:foto_id', obtenerIP, eliminarVotoPorIP); 

module.exports = router;
