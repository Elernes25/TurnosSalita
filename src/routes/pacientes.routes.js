const express = require('express');
const router = express.Router();

const{getPacientes,getPacientesDNI,createPacientes,deletePacientes}=require('../controllers/pacientes.controllers.js');
/* especifica que se importan las funciones getPacientes, getPacientesDNI, createPacientes 
y deletePacientes desde el archivo pacientes.controllers.js ubicado en la carpeta controllers. 
Estas funciones se utilizarán como controladores para manejar las solicitudes HTTP relacionadas
con los pacientes. */

/*ENDPOINTS PACIENTES */
router.get('/', getPacientes);
router.get('/:dni', getPacientesDNI);
router.post('/', createPacientes);
router.delete('/:id', deletePacientes);    

module.exports = router;