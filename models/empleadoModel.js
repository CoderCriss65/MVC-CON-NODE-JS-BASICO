const empleadoModel = {};

// 1. Obtener todos los empleados
empleadoModel.getAll = (callback) => {
  global.db.query("SELECT * FROM empleados", (error, results) => {
    callback(error, results);
  });
};

// 2. Obtener un empleado por ID
empleadoModel.getById = (id, callback) => {
  global.db.query("SELECT * FROM empleados WHERE id = ?", [id], (error, results) => {
    callback(error, results);
  });
};

// 3. Agregar un nuevo empleado
empleadoModel.add = (empleado, callback) => {
  const { nombre, puesto, salario } = empleado;
  global.db.query(
    "INSERT INTO empleados (nombre, puesto, salario) VALUES (?, ?, ?)",
    [nombre, puesto, salario],
    (error, result) => {
      callback(error, result);
    }
  );
};

// 4. Inserción masiva de empleados
empleadoModel.addMasivo = (empleados, callback) => {
  const valores = empleados.map(({ nombre, puesto, salario }) => [nombre, puesto, salario]);
  const sql = "INSERT INTO empleados (nombre, puesto, salario) VALUES ?";
  global.db.query(sql, [valores], (error, result) => {
    callback(error, result);
  });
};

// 5. Actualizar un empleado
empleadoModel.update = (id, empleado, callback) => {
  const { nombre, puesto, salario } = empleado;
  global.db.query(
    "UPDATE empleados SET nombre = ?, puesto = ?, salario = ? WHERE id = ?",
    [nombre, puesto, salario, id],
    (error, result) => {
      callback(error, result);
    }
  );
};

// 6. Eliminar un empleado
empleadoModel.delete = (id, callback) => {
  global.db.query("DELETE FROM empleados WHERE id = ?", [id], (error, result) => {
    callback(error, result);
  });
};

module.exports = empleadoModel;
