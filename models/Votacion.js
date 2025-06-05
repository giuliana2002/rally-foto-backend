const db = require('../utils/db');

const Votacion = {
  registrar: async (fotografia_id, ip) => {
    const [rows] = await db.execute(
      'SELECT * FROM votaciones WHERE fotografia_id = ? AND ip = ?',
      [fotografia_id, ip]
    );
    if (rows.length > 0) return false;
    await db.execute(
      'INSERT INTO votaciones (fotografia_id, ip) VALUES (?, ?)',
      [fotografia_id, ip]
    );
    return true;
  },
  contarVotosPorRally: async (rally_id) => {
  const [rows] = await db.execute(
    `SELECT f.id AS fotografia_id, f.url, u.nombre AS autor, COUNT(v.id) AS votos
     FROM votaciones v
     JOIN fotografias f ON v.fotografia_id = f.id
     JOIN usuarios u ON f.usuario_id = u.id
     WHERE f.rally_id = ? AND f.estado = 'admitida'
     GROUP BY v.fotografia_id
     ORDER BY votos DESC`,
    [rally_id]
  );
  return rows;
  }
};


module.exports = Votacion;
