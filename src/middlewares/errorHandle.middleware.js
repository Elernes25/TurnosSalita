/*para que los desarrolladores sepan cual es el error que estamos capturando */
const rutaNoEncontrada = (req, res, next) => {
  res.status(404).json({
    success: false,
    timestamp: new Date().toISOString(),    
    error: 'Ruta no encontrada (404)'
  });
}

module.exports = rutaNoEncontrada;
