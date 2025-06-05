const Configuracion = require('../models/Configuracion');

const obtenerConfiguracion = async (req, res) => {
  try {
    const config = await Configuracion.obtener();
    res.json(config);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener configuración', error: err.message });
  }
};

module.exports = {
  obtenerConfiguracion
};
