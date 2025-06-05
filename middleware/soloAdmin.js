module.exports = (req, res, next) => {
  if (req.usuario && req.usuario.rol === 'admin') {
    next();
  } else {
    res.status(403).json({ mensaje: 'Acceso denegado: se requiere rol de administrador' });
  }
};
