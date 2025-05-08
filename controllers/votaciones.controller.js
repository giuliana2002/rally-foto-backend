const db = require('../models/db');

// Registrar una votación
exports.votar = async (req, res) => {
  try {
    const { fotografia_id, ip_usuario, calidad_tecnica, creatividad, composicion, comentario } = req.body;

    // Puedes añadir lógica para limitar una IP a 1 voto por foto
    const [yaVoto] = await db.execute(
      'SELECT * FROM votaciones WHERE fotografia_id = ? AND ip_usuario = ?',
      [fotografia_id, ip_usuario]
    );

    if (yaVoto.length > 0) {
      return res.status(400).json({ error: 'Ya has votado esta fotografía desde esta IP.' });
    }

    await db.execute(
      `INSERT INTO votaciones 
       (fotografia_id, ip_usuario, calidad_tecnica, creatividad, composicion, comentario)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [fotografia_id, ip_usuario, calidad_tecnica, creatividad, composicion, comentario]
    );

    res.status(201).json({ mensaje: 'Votación registrada con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener promedios por foto
exports.promediosPorFoto = async (req, res) => {
  try {
    const { fotoId } = req.params;

    const [resultados] = await db.execute(
      `SELECT 
         AVG(calidad_tecnica) AS calidad_promedio,
         AVG(creatividad) AS creatividad_promedio,
         AVG(composicion) AS composicion_promedio,
         COUNT(*) AS total_votos
       FROM votaciones
       WHERE fotografia_id = ?`,
      [fotoId]
    );

    res.json(resultados[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
