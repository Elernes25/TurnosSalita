const auditoriaMunicipal = (req, res, next) => {
    const horaActual = new Date().toLocaleTimeString();
    const metodo=req.method;
    const ruta=req.originalUrl;
    console.log(`[${horaActual}] ${metodo} ${ruta}`);
    next(); // continúa con la siguiente función        
}
module.exports = auditoriaMunicipal;



/* para gurdar en la base de datos hacer este schema
const mongoose = require('mongoose');

const auditoriaSchema = new mongoose.Schema({
  fecha: { type: Date, default: Date.now } // útil para ordenar, conviene usar solo fecha que ya incluye hora
  hora: { type: String, required: true },  // despues si quiero mostrarlo lo puedo personalizar
  metodo: { type: String, required: true },
  ruta: { type: String, required: true },
  
});

module.exports = mongoose.model('Auditoria', auditoriaSchema);
*/

/***************************************************/
/*
const Auditoria = require('../models/auditoria.model');

const auditoriaMunicipal = async (req, res, next) => {
  const fechaActual = new Date().toLocaleDateString("es-AR");
  const horaActual = new Date().toLocaleTimeString();
  const metodo = req.method;
  const ruta = req.originalUrl;
 
  console.log(`[${horaActual}] ${metodo} ${ruta}`);

  try {
    await Auditoria.create({
      fecha:fechaActual
      hora: horaActual,
      metodo,
      ruta,
  
    });
  } catch (error) {
    console.error('Error guardando auditoría:', error.message);
  }

  next(); // continúa con la siguiente función
};

module.exports = auditoriaMunicipal;
*/

/************************/
//para mostrar la fecha almacenada:
/*const fecha = new Date(fechaAlmacenada);
const fechaFormateada = fecha.toLocaleDateString("es-AR");

console.log(fechaFormateada); 
// → "28/8/2026"
*/


/*
Mejoras de seguridad en un middleware de auditoría
Dirección IP  
Capturar req.ip o req.headers['x-forwarded-for'] si usas proxy/reverse proxy. 
Esto permite identificar el origen de la petición.

Usuario autenticado  
Si tu app usa JWT o sesiones, guarda el userId o correo del usuario que hace la petición.
Así relacionas cada acción con una identidad.

Headers críticos  
Registrar User-Agent y Referer puede ayudarte a detectar patrones de bots, scrapers o ataques.

Código de respuesta  
Además del request, guarda el res.statusCode. Es útil para auditar intentos fallidos (401, 403, 404)
y detectar ataques de fuerza bruta.

Duración de la petición  
Mide el tiempo entre req y res para identificar endpoints que tardan demasiado o posibles ataques
de denegación de servicio.

Sanitización y limitación  
Evita guardar datos sensibles (contraseñas, tokens) en los logs. Aplica un límite de tamaño
a lo que se persiste para no saturar la base.

Alertas en tiempo real  
Configura triggers: por ejemplo, si hay más de 10 intentos fallidos de login en 1 minuto desde la misma IP,
dispara una alerta.

const Auditoria = require('../models/auditoria.model');

const auditoriaMunicipal = async (req, res, next) => {
  const horaActual = new Date().toLocaleTimeString();
  const metodo = req.method;
  const ruta = req.originalUrl;
  const ip = req.ip;
  const userAgent = req.headers['user-agent'];
 // const usuario = req.user ? req.user.id : 'anon'; no le encuentro sentido si no chequeo en una base de datos

  res.on('finish', async () => {
    try {
      await Auditoria.create({
        hora: horaActual,
        metodo,
        ruta,
        ip,
        userAgent,
        usuario,
        statusCode: res.statusCode
      });
    } catch (error) {
      console.error('Error guardando auditoría:', error.message);
    }
  });

  next();
}; */