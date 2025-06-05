# Rally Fotográfico
Cosas Implementadas

- Registro y login con JWT
- Gestión de usuarios (roles)
- Subida de fotografías a Cloudinary
- Votación pública con control por IP
- Panel de administración para validar fotos, gestionar participantes y crear rally

---

## Requisitos

- Node.js
- MySQL
- Cloudinary

---

## Instalación

1. Clona el proyecto o descarga el ZIP.
2. Crear la bbdd
3. Configura tus variables en el env:
   - Credenciales de MySQL
   - Clave secreta JWT
   - API de Cloudinary

4. Instala las dependencias: npm install

5. Inicia el servidor: node server.js

---

## Estructura principal

- `server.js`: punto de entrada
- `routes/`: define las rutas API
- `controllers/`: lógica de cada módulo
- `models/`: interacción con MySQL
- `middleware/`: protección de rutas
- `utils/`: conexión DB + Cloudinary

---

##  Admin

Usuarios con rol `admin` pueden:

- Validar/rechazar fotos
- Cambiar roles
- Eliminar cuentas
- Crear rallys

