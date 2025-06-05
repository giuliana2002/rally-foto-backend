const express = require('express');
const router = express.Router();
const {
  crearRally,
  obtenerTodos,
  obtenerActivos
} = require('../controllers/rallys.controller');
const verificarToken = require('../middleware/verificarToken');
const soloAdmin = require('../middleware/soloAdmin');

router.post('/', verificarToken, soloAdmin, crearRally);
router.get('/', obtenerTodos);
router.get('/activos', obtenerActivos);
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const foto = await Fotografia.buscarPorId(id);
    if (!foto) return res.status(404).json({ mensaje: 'Fotografía no encontrada' });
    res.json(foto);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener fotografía', error: err.message });
  }
});


module.exports = router;
