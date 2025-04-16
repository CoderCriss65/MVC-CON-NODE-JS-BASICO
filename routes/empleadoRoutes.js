const express = require("express");
const router = express.Router();
const empleadoController = require("../controllers/empleadoController");

// 📌 1️⃣ Obtener todos los empleados
router.get("/", empleadoController.getAllEmpleados);

// 📌 2️⃣ Obtener un empleado por su ID
router.get("/:id", empleadoController.getEmpleadoById);

// 📌 3️⃣ Agregar un nuevo empleado
router.post("/", empleadoController.addEmpleado);

// Agregar empleados de forma masiva
router.post("/masivo", empleadoController.addEmpleadosMasivo);

// 📌 4️⃣ Actualizar un empleado
router.put("/:id", empleadoController.updateEmpleado);

// 📌 5️⃣ Eliminar un empleado
router.delete("/:id", empleadoController.deleteEmpleado);

module.exports = router;
