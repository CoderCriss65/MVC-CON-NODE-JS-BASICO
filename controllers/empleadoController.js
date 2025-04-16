const empleadoModel = require("../models/empleadoModel");

const empleadoController = {};

// Obtener todos los empleados
empleadoController.getAllEmpleados = (req, res) => {
  empleadoModel.getAll((error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
};

// Obtener un empleado por ID
empleadoController.getEmpleadoById = (req, res) => {
  const id = req.params.id;
  empleadoModel.getById(id, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ mensaje: "Empleado no encontrado" });
    }
    res.json(results[0]);
  });
};

// Agregar un nuevo empleado
empleadoController.addEmpleado = (req, res) => {
  const { nombre, puesto, salario } = req.body;
  if (!nombre || !puesto || !salario) {
    return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
  }
  empleadoModel.add({ nombre, puesto, salario }, (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(201).json({ mensaje: "Empleado agregado", id: result.insertId });
  });
};

// Agregar empleados de forma masiva
empleadoController.addEmpleadosMasivo = (req, res) => {
  const empleados = req.body;
  if (!Array.isArray(empleados) || empleados.length === 0) {
    return res.status(400).json({ mensaje: "Debe enviar un array de empleados válido." });
  }
  empleadoModel.addMasivo(empleados, (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(201).json({ mensaje: "Empleados agregados correctamente", filasInsertadas: result.affectedRows });
  });
};

// Actualizar un empleado
empleadoController.updateEmpleado = (req, res) => {
  const id = req.params.id;
  const { nombre, puesto, salario } = req.body;
  if (!nombre || !puesto || !salario) {
    return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
  }
  empleadoModel.update(id, { nombre, puesto, salario }, (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Empleado no encontrado" });
    }
    res.json({ mensaje: "Empleado actualizado correctamente" });
  });
};

// Eliminar un empleado
empleadoController.deleteEmpleado = (req, res) => {
  const id = req.params.id;
  empleadoModel.delete(id, (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Empleado no encontrado" });
    }
    res.json({ mensaje: "Empleado eliminado correctamente" });
  });
};

module.exports = empleadoController;
