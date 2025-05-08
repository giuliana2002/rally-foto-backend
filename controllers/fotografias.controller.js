const db = require('../models/db');

// Subir una nueva fotografía
exports.subirFoto = async (req, res) => {
  try {
    const { usuario_id, titulo, descripcion, url } = req.body;

    const [result] = await db.execute(
      'INSERT INTO fotografias (usuario_id, titulo, descripcion, url) VALUES (?, ?, ?, ?)',
      [usuario_id, titulo, descripcion, url]
    );

    res.status(201).json({ mensaje: 'Foto subida con éxito', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las fotos admitidas (galería pública)
exports.obtenerGaleria = async (req, res) => {
  try {
    const [fotos] = await db.execute(
      "SELECT * FROM fotografias WHERE estado = 'admitida' ORDER BY created_at DESC"
    );

    res.json(fotos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cambiar estado (admin)
exports.actualizarEstadoFoto = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    await db.execute(
      "UPDATE fotografias SET estado = ? WHERE id = ?",
      [estado, id]
    );

    res.json({ mensaje: 'Estado actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message
    });
    }
}
