const Turno = require('../models/turno.js');
const respuestaEstandar=require('../utils/respuestaEstandar.js');


// GET: listar turnos
//const getTurnos = async (req, res) => {
//  try {
//    const turnos = await Turno.find({ activo: true }).populate('paciente'); /*populate: función de Mongoose para reemplazar el ObjectId del paciente con los datos del paciente (nombre, apellido y dni) */
//      return respuestaEstandar(res, 200, true, "Turnos obtenidos correctamente", turnos);
//    } catch (error) {
 //     return respuestaEstandar(res, 500, false, "Error al obtener los turnos", error.message);
      //* res.status(500).json({ error: error.message });*/
 //   }
//};
/*
const getTurnosID = async (req, res) => {
  try {
    const { id } = req.params;
    const turno = await Turno.findOne({ id: id });
    if (!turno) {
        return respuestaEstandar(res, 404, false, `turno no encontrado con ID: ${id}`);
    }
        return respuestaEstandar(res, 200, true, "Turno obtenido correctamente", turno);
  } catch (error) {
    return respuestaEstandar(res, 500, false, "Error al obtener el turno", error.message);
  }
};

*/


// GET: listar turnos con filtros dinámicos
const getTurnos = async (req, res) => {
  try {
    // Extraer los query params
    const { especialidad, activo, paciente, id } = req.query;

    // Construir objeto de filtros dinámicamente
    const filtros = {};
    if (id) {filtros.id = id;
      console.log("filtro por id", filtros.id);
    };
    if (especialidad) filtros.especialidad = especialidad;
    if (activo !== undefined) filtros.activo = activo === 'true'; // convertir string a boolean
    if (paciente) filtros.paciente = paciente; // si quieres filtrar por id de paciente

    // Consulta con filtros
    const turnos = await Turno.find(filtros).populate('paciente');

    if (turnos.length === 0) {
      return respuestaEstandar(res, 404, false, "No se encontraron turnos con esos filtros");
    }

    return respuestaEstandar(res, 200, true, "Turnos obtenidos correctamente", turnos);
  } catch (error) {
    return respuestaEstandar(res, 500, false, "Error al obtener los turnos", error.message);
  }
};

/*
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
*/
// POST: guardar turno
const createTurnos = async (req, res) => {
  try {

    const origenPeticion=req.headers['x-origen'];
    const tokenSeguridad=req.headers['authorization'];
    console.log("peticion realizada desde",origenPeticion);
    if (tokenSeguridad!='token123'){
        return respuestaEstandar(res,401,false,'No tiene permisos')
    };

    // ?urgencia=true
    const  esUrgente=req.query.urgencia ==='true';
    const datosDelTurno ={
        paciente:req.body.paciente,
        especialidad:req.body.especialidad,
        fechaTurno:req.bodyFechaTurno
    };
    if (esUrgente){
        datosDelTurno.estado='atendido';
        datosDelTurno.observaciones='ingresoporguardiamedica';
        console.log("🚨 ALERTA: registrado un turno de urgencia");

    }

    const nuevoTurno = new Turno(req.body);
    await nuevoTurno.save();
  
    /*POPULATE PARA vincular el id pero para mostrar el nombre del paciente*//*es decir formatear la salida */
    return respuestaEstandar(res, 201, true, "Turno creado exitosamente", nuevoTurno.populate('paciente')); /*populate*/
  } catch (error) {
    if(error.name === 'ValidationError') {
      const errores=Object.values(error.errors).map(err => err.message);
      return respuestaEstandar(res, 400, false, "Error de validación", errores);
    } 
    return respuestaEstandar(res, 400, false, "Error al crear el turno", error.message);
  }
};

//DELETE: eliminar turno por ID Ej: http://localhost:3000/api/v1/turnos/6a5945fdf6215d646538767e
const deleteTurnos = async (req, res) => {
  try {
    const { id } = req.params;

    const turnoBorrado = await Turno.findByIdAndUpdate(
        id,
        {activo: false, estado: 'cancelado' }, //*cambios*/
        { new: true }                           //*OPTIONS*/
      ); /*{new:true} devuelve el documento actualizado en lugar del original. */

    if (!turnoBorrado) {
        return respuestaEstandar(res, 404, false, `Turno no encontrado ${id}`);
    }
    
      respuestaEstandar(res, 200, true, "Turno eliminado exitosamente", turnoBorrado);
    } catch (error) {
      return respuestaEstandar(res, 400, false, "ID con formato invalido", error.message);
      
    }
};

const marcarAtendido = async(req,res)=>{
  try{
    const {id} =req.params;
    const turnoActualizado = await Turno.findByIdAndUpdate (
      id,
      {estado:'atendido'},
      {new:true}
    );
    if (!turnoActualizado) return respuestaEstandar(res, 404,false,'turno no encontrado ',id);
      return respuestaEstandar(res, 200,true,'turno Actualizado', turnoActualizado);
  } catch (error) {
    return respuestaEstandar(res, 500,false,'ID con formato no valido',error.message);

  }

};

//module.exports = { getTurnos, getTurnosEspecialidad,createTurnos, deleteTurnos,marcarAtendido,getTurnosID };
module.exports = { getTurnos, createTurnos, deleteTurnos, marcarAtendido };