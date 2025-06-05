function obtenerIP(req, res, next) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || '';
  req.ipUsuario = ip.split(',')[0].trim(); 
  next();
}

module.exports = { obtenerIP };
