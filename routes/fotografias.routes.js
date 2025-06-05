const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Fotografia = require('../models/Fotografia');
const router = express.Router();

const {
  subirFotografia,
  obtenerPublicas,
  obtenerMisFotos,
  validarFoto,
  eliminarFoto,
  obtenerPendientes
} = require('../controllers/fotografias.controller');

const verificarToken = require('../middleware/verificarToken');
const soloAdmin = require('../middleware/soloAdmin');

const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get('/publicas', obtenerPublicas);
router.get('/mias', verificarToken, obtenerMisFotos);
router.post('/subir', verificarToken, upload.single('foto'), subirFotografia);
router.put('/:id/validar', verificarToken, soloAdmin, validarFoto);
router.delete('/:id', verificarToken, eliminarFoto);
router.get('/pendientes', verificarToken, soloAdmin, obtenerPendientes);

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
