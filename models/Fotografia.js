const db = require('../utils/db');

const Fotografia = {

  crear: async (datos) => {
    const [result] = await db.execute(
      'INSERT INTO fotografias (usuario_id, url, titulo, descripcion, estado, rally_id) VALUES (?, ?, ?, ?, ?, ?)',
      [datos.usuario_id, datos.url, datos.titulo, datos.descripcion, 'pendiente', datos.rally_id]
    );
    return result.insertId;
  },
  obtenerPorEstadoYRally: async (estado, rally_id) => {
    const [rows] = await db.execute(
      'SELECT f.*, u.nombre AS autor FROM fotografias f JOIN usuarios u ON f.usuario_id = u.id WHERE estado = ? AND rally_id = ?',
      [estado, rally_id]
    );
    return rows;
  },
  obtenerPorUsuario: async (usuario_id) => {
    const [rows] = await db.execute('SELECT * FROM fotografias WHERE usuario_id = ?', [usuario_id]);
    return rows;
  },
  contarPorUsuario: async (usuario_id) => {
    const [rows] = await db.execute('SELECT COUNT(*) AS total FROM fotografias WHERE usuario_id = ?', [usuario_id]);
    return rows[0]?.total || 0;
  },
  actualizarEstado: async (id, nuevoEstado) => {
    await db.execute('UPDATE fotografias SET estado = ? WHERE id = ?', [nuevoEstado, id]);
  },
  eliminar: async (id) => {
    await db.execute('DELETE FROM fotografias WHERE id = ?', [id]);
  },
  buscarPorId: async (id) => {
    const [rows] = await db.execute(
      `SELECT f.*, u.nombre AS autor
     FROM fotografias f
     JOIN usuarios u ON f.usuario_id = u.id
     WHERE f.id = ? AND f.estado = 'admitida'`,
      [id]
    );
    return rows[0];
  },

  obtenerPorEstado: async (estado) => {
    const [rows] = await db.execute('SELECT * FROM fotografias WHERE estado = ?', [estado]);
    return rows;
  }
};




module.exports = Fotografia;
