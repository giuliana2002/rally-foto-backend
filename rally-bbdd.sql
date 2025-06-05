CREATE DATABASE IF NOT EXISTS rally CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE rally;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  rol ENUM('admin', 'participante') DEFAULT 'participante',
  imagen_url VARCHAR(255),
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS rallys (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  activo BOOLEAN DEFAULT TRUE,
  fecha_inicio DATE,
  fecha_fin DATE
);

CREATE TABLE IF NOT EXISTS fotografias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  rally_id INT NOT NULL,
  url VARCHAR(255) NOT NULL,
  titulo VARCHAR(100),
  descripcion TEXT,
  estado ENUM('pendiente', 'admitida', 'rechazada') DEFAULT 'pendiente',
  subida_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (rally_id) REFERENCES rallys(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS votaciones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fotografia_id INT NOT NULL,
  ip VARCHAR(45),
  creada_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (fotografia_id) REFERENCES fotografias(id) ON DELETE CASCADE
);
