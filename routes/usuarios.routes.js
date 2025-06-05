const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {
  registrarUsuario,
  login,
  obtenerUsuarios,
  cambiarRol,
  eliminarUsuario,
  actualizarPerfil
} = require('../controllers/usuarios.controller');
const verificarToken = require('../middleware/verificarToken');
const soloAdmin = require('../middleware/soloAdmin');
const Usuario = require('../models/Usuario');

// Configuración de multer
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Registro y login
router.post('/registro', registrarUsuario);
router.post('/login', login);

// Solo para administradores
router.get('/', verificarToken, soloAdmin, obtenerUsuarios);
router.put('/:id/rol', verificarToken, soloAdmin, cambiarRol);
router.delete('/:id', verificarToken, soloAdmin, eliminarUsuario);


router.get('/me', verificarToken, async (req, res) => {
  try {
    const usuario = await Usuario.buscarPorId(req.usuario.id);
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener perfil', error: err.message });
  }
});


// Actualización de perfil con imagen
router.put('/perfil', verificarToken, upload.single('imagen'), actualizarPerfil);

module.exports = router;
