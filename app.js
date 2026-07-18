require('dotenv').config({ path: './src/.env' }); /*carga las variables de entorno desde el archivo .env*/


const express = require('express');
const connectDB = require('./src/config/database.js');
const app = express();

connectDB(); /*conecta a la base de datos usando la función connectDB del archivo database.js*/


const auditoriaMiddleware = require('./src/middlewares/auditoria.middleware.js');
const errorHandleMiddleware = require('./src/middlewares/errorHandle.middleware.js');
const turnosRoutes = require('./src/routes/turnos.routes.js');
const pacientesRoutes = require('./src/routes/pacientes.routes.js');

app.use(express.json());
app.use(auditoriaMiddleware);

app.use('/api/v1/turnos', turnosRoutes); /*termina el flujo con un response */
app.use('/api/v1/pacientes', pacientesRoutes); 

app.use(errorHandleMiddleware); /*manejo de errores para rutas no encontradas*/

const PORT = process.env.PORT || 3000; /*si no hay puerto definido en el archivo .env, se usa el puerto 3000*/
app.listen(PORT, () => {
    console.log(`========================================================`);
    console.log(`================Servidor Municipal Escuchando===========`);
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
    console.log(`Entorno: ${process.env.ENTORNO||`local`}`);
    console.log(`========================================================`);
});

/*¿Qué es process?
Es un objeto que representa el proceso en ejecución de Node.js.
Process es parte de Node.js, siempre disponible. (global, no hay que importarlo)
Contiene información sobre:
    El entorno (process.env)
    El PID del proceso (process.pid)
    La plataforma (process.platform)
    Señales y eventos del sistema (process.on(...))

Deja ver y manipular el estado del programa que está corriendo*/