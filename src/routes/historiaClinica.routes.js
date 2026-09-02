const express = require('express');
const router = express.Router();
const {
    createHistoriaClinica,
    getHistoriasClinicas,
    getHistoriaClinicaByPaciente
} = require('../controllers/historiaClinica.controller');

router.get('/', getHistoriasClinicas);
router.post('/', createHistoriaClinica);
router.get('/paciente/:pacienteId', getHistoriaClinicaByPaciente);

module.exports = router;

