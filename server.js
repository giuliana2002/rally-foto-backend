const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

// Configuración
dotenv.config();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/fotografias', require('./routes/fotografias.routes'));
app.use('/api/votaciones', require('./routes/votaciones.routes'));
app.use('/api/rallys', require('./routes/rallys.routes'));
app.use('/api/configuracion', require('./routes/configuracion.routes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
