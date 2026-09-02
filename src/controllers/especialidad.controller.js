const Especialidad = require('../models/especialidad');
const respuestaEstandar = require('../utils/respuestaEstandar');


const getEspecialidades = async (req, res) => {
  try {
    const listaEspecialidades = await Especialidad.find();

    return respuestaEstandar(
      res,
      200,
      true,
      'Especialidades obtenidas exitosamente',
      listaEspecialidades
    );
  } catch (error) {
    return respuestaEstandar(
      res,
      500,
      false,
      'Error interno del servidor',
      error
    );
  }
};


const createEspecialidad = async (req, res) => {
  try {
    const nuevaEspecialidad = await Especialidad.create(req.body);

    return respuestaEstandar(
      res,
      201,
      true,
      'Especialidad creada exitosamente',
      nuevaEspecialidad
    );
  } catch (error) {
    return respuestaEstandar(
      res,
      500,
      false,
      'Error interno del servidor',
      error
    );
  }
};

module.exports = {
  getEspecialidades,
  createEspecialidad
};