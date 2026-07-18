const Turno = require('../models/turno');

const respuestaEstandar = (res, status, success,message, data = null) => {
  res.status(status).json({
    success: success,
    timestamp: new Date().toISOString(),
    mensaje: message,
    total: Array.isArray(data) ? data.length : (data ? 1 : 0), /*si data es un array, devuelve su longitud; si data es un objeto, devuelve 1; si data es null, devuelve 0*/
    datos: data
  });
};

// GET: listar turnos
const getTurnos = async (req, res) => {
  try {
    const turnos = await Turno.find();
    //* res.json(turnos);*/
      return respuestaEstandar(res, 200, true, "Turnos obtenidos correctamente", turnos);
    } catch (error) {
      return respuestaEstandar(res, 500, false, "Error al obtener los turnos", error.message);
      //* res.status(500).json({ error: error.message });*/
    }
};

// GET: obtener turnos por especialidad Ej: http://localhost:3000/api/v1/turnos/Odontología
const getTurnosEspecialidad = async (req, res) => {
  try {
    const { especialidad } = req.params;
    const turnosFiltrados = await Turno.find({ especialidad: especialidad });
    if (turnosFiltrados.length === 0) {
      return respuestaEstandar(res, 404, false, `No se encontraron turnos para la especialidad: ${especialidad}`);
    }

    return respuestaEstandar(res, 200, true, `Turnos de la especialidad: ${especialidad}`, turnosFiltrados); 
  }
  catch (error) {
    return respuestaEstandar(res, 500, false, "Error al obtener los turnos", error.message);
  }
}

// POST: guardar turno
const createTurnos = async (req, res) => {
  try {
    const nuevoTurno = new Turno(req.body);
    await nuevoTurno.save();
    //res.status(201).json(nuevoTurno);
    return respuestaEstandar(res, 201, true, "Turno creado exitosamente", nuevoTurno);
  } catch (error) {
    // res.status(400).json({ error: error.message });
    return respuestaEstandar(res, 400, false, "Error al crear el turno", error.message);
  }
};

//DELETE: eliminar turno por ID Ej: http://localhost:3000/api/v1/turnos/6a5945fdf6215d646538767e
const deleteTurnos = async (req, res) => {
  try {
    const { id } = req.params;
    const turno = await Turno.findByIdAndDelete(id);
    if (!turno) {
      return respuestaEstandar(res, 404, false, `Turno no encontrado ${id}`);
    }
    
    return respuestaEstandar(res, 200, true, "Turno eliminado exitosamente", turno);
    } catch (error) {
      return respuestaEstandar(res, 400, false, "ID con formato invalido", error.message);
      
    }
}


module.exports = { getTurnos, getTurnosEspecialidad,createTurnos, deleteTurnos };
