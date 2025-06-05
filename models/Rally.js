const db = require('../utils/db');

const Rally = {
  crear: async (rally) => {
    const [result] = await db.execute(
      'INSERT INTO rallys (nombre, descripcion, activo, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?, ?)',
      [rally.nombre, rally.descripcion, rally.activo || true, rally.fecha_inicio, rally.fecha_fin]
    );
    return result.insertId;
  },
  obtenerTodos: async () => {
    const [rows] = await db.execute('SELECT * FROM rallys');
    return rows;
  },
  obtenerActivos: async () => {
    const [rows] = await db.execute('SELECT * FROM rallys WHERE activo = 1');
    return rows;
  }
};

module.exports = Rally;
