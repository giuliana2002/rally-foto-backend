const Rally = require('../models/Rally');

const crearRally = async (req, res) => {
  try {
    const { nombre, descripcion, activo, fecha_inicio, fecha_fin } = req.body;
    const id = await Rally.crear({ nombre, descripcion, activo, fecha_inicio, fecha_fin });
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear rally', error: err.message });
  }
};

const obtenerTodos = async (req, res) => {
  try {
    const lista = await Rally.obtenerTodos();
    res.json(lista);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener rallys', error: err.message });
  }
};

const obtenerActivos = async (req, res) => {
  try {
    const lista = await Rally.obtenerActivos();
    res.json(lista);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener rallys activos', error: err.message });
  }
};

module.exports = {
  crearRally,
  obtenerTodos,
  obtenerActivos
};
