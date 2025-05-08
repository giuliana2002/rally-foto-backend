const db = require('../models/db');
const bcrypt = require('bcrypt'); // Importa bcrypt

exports.registrarUsuario = async (req, res) => {
    try {
      const { nombre, email, password, rol } = req.body;
  
      const saltRounds = 10; 
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      console.log('Contraseña original:', password); 
      console.log('Contraseña cifrada:', hashedPassword); 
  
      const avatar_url = "https://res.cloudinary.com/daridipoq/image/upload/v1745162345/samples/man-portrait.jpg";
  
      const [result] = await db.execute(
        'INSERT INTO usuarios (nombre, email, password, rol, avatar_url) VALUES (?, ?, ?, ?, ?)',
        [nombre, email, hashedPassword, rol || 'participante', avatar_url]
      );
  
      res.status(201).json({ mensaje: 'Usuario registrado', id: result.insertId });
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: error.message });
    }
  };