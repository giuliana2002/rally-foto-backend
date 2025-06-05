const db = require('../utils/db');

const Usuario = {
  crear: async (usuario) => {
    const [result] = await db.execute(
      'INSERT INTO usuarios (nombre, email, password, rol, imagen_url) VALUES (?, ?, ?, ?, ?)',
      [usuario.nombre, usuario.email, usuario.password, usuario.rol || 'participante', usuario.imagen_url || null]
    );
    return result.insertId;
  },
  buscarPorEmail: async (email) => {
    const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows[0];
  },
  buscarPorId: async (id) => {
    const [rows] = await db.execute('SELECT id, nombre, email, rol, imagen_url FROM usuarios WHERE id = ?', [id]);
    return rows[0];
  },
  obtenerTodos: async () => {
    const [rows] = await db.execute('SELECT id, nombre, email, rol, imagen_url FROM usuarios');
    return rows;
  },
  cambiarRol: async (id, nuevoRol) => {
    await db.execute('UPDATE usuarios SET rol = ? WHERE id = ?', [nuevoRol, id]);
  },
  eliminar: async (id) => {
    await db.execute('DELETE FROM usuarios WHERE id = ?', [id]);
  },
  actualizarPerfil: async (id, nombre, email, imagen_url) => {
  if (imagen_url) {
    await db.execute('UPDATE usuarios SET nombre = ?, email = ?, imagen_url = ? WHERE id = ?', [nombre, email, imagen_url, id]);
  } else {
    await db.execute('UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?', [nombre, email, id]);
  }
}
};

module.exports = Usuario;
