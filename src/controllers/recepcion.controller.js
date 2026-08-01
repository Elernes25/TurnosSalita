const mongoose=require('mongoose');
const Turno=require('../models/turno.js');
const Paciente=require('../models/paciente.js');
const respuestaEstandar=require('../utils/respuestaEstandar.js');

const registrarIngreso = async(req,res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const {datosPaciente, especilidad, fechaTurno, estado, observaciones}=req.body;
        const [nuevoPaciente]=await Paciente.create([datosPaciente],{session});

        const [nuevoturno]=await Turno.create([{
            paciente: nuevoPaciente_id,
            especialidad,
            fechaTurno,
            estado: estado || 'pendiente',
            observaciones
        }], {session}
        );
        await session.commitTransaction();
        session.endSession;

        const turnoCompleto = await Turno.findById(nuevoTurno.id).populate('paciente');
        return respuestaEstandar(res, 201, true, "ingreso paciente nuevo", turnoCompleto);
    } catch (error){
        await session.abortTransaction();
        session.endSession();
        if (error.name === 'ValidationError') {
            const errores = Object.values(error.errors).map(err => err.message);
            return respuestaEstandar(res, 400, false, 'Error de validación', errores);
        }
        return respuestaEstandar(res, 400, false, "transaccion abortada", error.message);
    }


};
module.exports = { registrarIngreso };
  
