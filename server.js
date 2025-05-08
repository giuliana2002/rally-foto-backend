const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/fotografias', require('./routes/fotografias.routes'));
app.use('/api/votaciones', require('./routes/votaciones.routes'));

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
