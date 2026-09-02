const Paciente = require('../models/paciente.js');
const respuestaEstandar=require('../utils/respuestaEstandar.js');

// GET: listar pacientes
const getPacientes = async (req, res) => {
  try {
    // ?obraSocial=OSDE@dni=23074839
    const {obraSocialNombre, dni}=req.query;
    const filtro={};
    if (obraSocialNombre){
      filtro.obraSocialNombre= obraSocialNombre.toUpperCase();
    
    }
     if (dni){
      filtro.dni=dni;
    }
    console.log("filtro armado", filtro);


    const pacientes = await Paciente.find(filtro);


    return respuestaEstandar(res, 200, true, "Pacientes obtenidos correctamente", pacientes);
  } catch (error) {
    return respuestaEstandar(res, 500, false, "Error al obtener los pacientes", error.message);
  
    }
};

// GET: obtener pacientes por DNI Ej: http://localhost:3000/api/v1/pacientes/12345678
const getPacientesDNI = async (req, res) => {
  try {
    const { dni } = req.params;
    const paciente = await Paciente.findOne({ dni: dni });
    if (!paciente) {
        return respuestaEstandar(res, 404, false, `Paciente no encontrado con DNI: ${dni}`);
    }
        return respuestaEstandar(res, 200, true, "Paciente obtenido correctamente", paciente);
  } catch (error) {
    return respuestaEstandar(res, 500, false, "Error al obtener el paciente", error.message);
  }
};


// POST: guardar paciente
const createPacientes = async (req, res) => {
  try {
    const nuevoPaciente = new Paciente(req.body);
    await nuevoPaciente.save();
    return respuestaEstandar(res, 201, true, "Paciente creado exitosamente", nuevoPaciente);
  } catch (error) {
    console.log(error.message);
    return respuestaEstandar(res, 400, false, "Error al crear el paciente", error.message);
  }
};

//DELETE: eliminar paciente por ID Ej: http://localhost:3000/api/v1/pacientes/6a5945fdf6215d646538767e
const deletePacientes = async (req, res) => {
  try {
    const { id } = req.params;   /*id, definido en la ruta*/
    const paciente = await Paciente.findByIdAndDelete(id);
    if (!paciente) {
      return respuestaEstandar(res, 404, false, `Paciente no encontrado ${id}`);
    }
    return respuestaEstandar(res, 200, true, "Paciente eliminado exitosamente", paciente);
} catch (error) {
      return respuestaEstandar(res, 400, false, "ID con formato invalido", error.message);
   
  }
}


module.exports = { getPacientes, getPacientesDNI, createPacientes, deletePacientes };
