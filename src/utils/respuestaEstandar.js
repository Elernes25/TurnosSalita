const respuestaEstandar = (res, status, success,message, data = null) => {
  res.status(status).json({
    success: success,
    timestamp: new Date().toISOString(),
    mensaje: message,
    total: Array.isArray(data) ? data.length : (data ? 1 : 0), /*si data es un array, devuelve su longitud; si data es un objeto, devuelve 1; si data es null, devuelve 0*/
    datos: data
  });
};

module.exports = respuestaEstandar;