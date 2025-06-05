const db = require('../utils/db');

const Configuracion = {
  obtener: async () => {
    const [rows] = await db.execute('SELECT * FROM configuracion LIMIT 1');
    return rows[0];
  }
};

module.exports = Configuracion;
