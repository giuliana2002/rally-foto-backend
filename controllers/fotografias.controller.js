const Fotografia = require('../models/Fotografia');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

const subirFotografia = async (req, res) => {
  try {
    const { titulo, descripcion, rally_id } = req.body;
    const archivo = req.file;
    if (!archivo || !rally_id) return res.status(400).json({ mensaje: 'Falta imagen o rally_id' });

    const resultado = await cloudinary.uploader.upload(archivo.path);
    const id = await Fotografia.crear({
      usuario_id: req.usuario.id,
      url: resultado.secure_url,
      titulo,
      descripcion,
      rally_id
    });

    fs.unlinkSync(archivo.path);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al subir la fotografía', error: err.message });
  }
};

const obtenerPublicas = async (req, res) => {
  try {
    const { rally_id } = req.query;
    if (!rally_id) return res.status(400).json({ mensaje: 'Falta rally_id' });
    const fotos = await Fotografia.obtenerPorEstadoYRally('admitida', rally_id);
    res.json(fotos);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener galería', error: err.message });
  }
};

const obtenerMisFotos = async (req, res) => {
  try {
    const fotos = await Fotografia.obtenerPorUsuario(req.usuario.id);
    res.json(fotos);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener tus fotografías', error: err.message });
  }
};

const validarFoto = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    await Fotografia.actualizarEstado(id, estado);
    res.json({ mensaje: 'Estado actualizado' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al validar fotografía', error: err.message });
  }
};

const eliminarFoto = async (req, res) => {
  try {
    const { id } = req.params;
    await Fotografia.eliminar(id);
    res.json({ mensaje: 'Fotografía eliminada' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al eliminar fotografía', error: err.message });
  }
};

const obtenerPendientes = async (req, res) => {
  try {
    const fotos = await Fotografia.obtenerPorEstado('pendiente');
    console.log('Fotos pendientes encontradas:', fotos);
    res.json(fotos);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener fotos pendientes', error: err.message });
  }
};


module.exports = {
  subirFotografia,
  obtenerPublicas,
  obtenerMisFotos,
  validarFoto,
  eliminarFoto,
  obtenerPendientes
};