const Votacion = require('../models/Votacion');


const votar = async (req, res) => {
  try {
    const { fotografia_id } = req.body;
    const ip = req.ip;

    const exito = await Votacion.registrar(fotografia_id, ip);
    if (!exito) return res.status(403).json({ mensaje: 'Ya has votado por esta fotografía' });

    res.json({ mensaje: 'Voto registrado' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al registrar voto', error: err.message });
  }
};

const ranking = async (req, res) => {
  try {
    const { rally_id } = req.query;
    if (!rally_id) return res.status(400).json({ mensaje: 'Falta rally_id' });

    const votos = await Votacion.contarVotosPorRally(rally_id);
    res.json(votos);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener ranking', error: err.message });
  }
};
// Total de votos por foto
const obtenerVotosPorFoto = async (req, res) => {
  const { foto_id } = req.params;
  try {
    const [rows] = await db.execute(
      'SELECT COUNT(*) AS votos FROM votaciones WHERE fotografia_id = ?',
      [foto_id]
    );
    res.json({ votos: rows[0].votos });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener votos' });
  }
};

// Verificar si esta IP ya votó
const verificarVotoPorIP = async (req, res) => {
  const { foto_id } = req.params;
  const ip = req.ipUsuario;
  try {
    const [rows] = await db.execute(
      'SELECT id FROM votaciones WHERE fotografia_id = ? AND ip = ?',
      [foto_id, ip]
    );
    res.json({ haVotado: rows.length > 0 });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al verificar voto' });
  }
};

// Eliminar el voto de esta IP
const eliminarVotoPorIP = async (req, res) => {
  const { foto_id } = req.params;
  const ip = req.ipUsuario;
  try {
    await db.execute(
      'DELETE FROM votaciones WHERE fotografia_id = ? AND ip = ?',
      [foto_id, ip]
    );
    res.json({ mensaje: 'Voto eliminado con éxito' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al eliminar el voto' });
  }
};

module.exports = {
  votar,
  ranking,
  obtenerVotosPorFoto,
  verificarVotoPorIP,
  eliminarVotoPorIP
};
