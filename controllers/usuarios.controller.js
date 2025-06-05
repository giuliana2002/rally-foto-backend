const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

const registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const usuarioExistente = await Usuario.buscarPorEmail(email);
    if (usuarioExistente) return res.status(400).json({ mensaje: 'El correo ya está registrado' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = await Usuario.crear({ nombre, email, password: hashedPassword });
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error en el servidor', error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.buscarPorEmail(email);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error: err.message });
  }
};

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.obtenerTodos();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios', error: err.message });
  }
};

const cambiarRol = async (req, res) => {
  try {
    const { id } = req.params;
    const { nuevoRol } = req.body;
    await Usuario.cambiarRol(id, nuevoRol);
    res.json({ mensaje: 'Rol actualizado' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al cambiar rol', error: err.message });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await Usuario.eliminar(id);
    res.json({ mensaje: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al eliminar usuario', error: err.message });
  }
};

const actualizarPerfil = async (req, res) => {
  try {
    const { nombre, email } = req.body;
    let imagen_url = null;

    if (req.file) {
      try {
        const resultado = await cloudinary.uploader.upload(req.file.path);
        imagen_url = resultado.secure_url;
        fs.unlinkSync(req.file.path);
      } catch (uploadErr) {
        console.error('Error al subir imagen a Cloudinary:', uploadErr.message);
        return res.status(500).json({ mensaje: 'Error al subir la imagen.' });
      }
    }

    await Usuario.actualizarPerfil(req.usuario.id, nombre, email, imagen_url);
    res.json({ mensaje: 'Perfil actualizado correctamente' });
  } catch (err) {
    console.error('Error al actualizar perfil:', err.message);
    res.status(500).json({ mensaje: 'Error general al actualizar perfil.' });
  }
};

module.exports = {
  registrarUsuario,
  login,
  obtenerUsuarios,
  cambiarRol,
  eliminarUsuario,
  actualizarPerfil
};
