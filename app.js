const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware para parsear JSON y evitar problemas de CORS
app.use(express.json());
app.use(cors());

// Conexión a la base de datos MySQL (se compartirá con el modelo)
const db = mysql.createConnection({
  host: "localhost",
  user: "root",       // Cambia esto si tu usuario de MySQL es diferente
  password: "123",    // Coloca la contraseña correspondiente si es necesario
  database: "empresa"
});
db.connect(err => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
  } else {
    console.log("Conectado a la base de datos MySQL");
  }
});

// Hacemos que la conexión esté disponible en el objeto global del modelo
global.db = db;

// Servir archivos estáticos (si es necesario)
app.use(express.static(path.join(__dirname, "src")));

// Rutas principales
app.use("/empleados", require("./routes/empleadoRoutes"));

// Ruta para servir "index.html" (página principal)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src", "index.html"));
});

// Iniciar el servidor
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});
