const express = require('express');
const router = express.Router();

const{getTurnos,getTurnosEspecialidad,createTurnos,deleteTurnos}=require('../controllers/turnos.controller.js');
/* especifica que se importan las funciones getTurnos, createTurnos y deleteTurnos 
desde el archivo turnos.controllers.js ubicado en la carpeta controllers. 
Estas funciones se utilizarán como controladores para manejar las solicitudes
HTTP relacionadas con los turnos. */

router.get('/', getTurnos);
router.get('/:especialidad', getTurnosEspecialidad);
router.post('/', createTurnos);
router.delete('/:id', deleteTurnos);    

module.exports = router;