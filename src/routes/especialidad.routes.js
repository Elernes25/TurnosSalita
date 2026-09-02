const express = require('express');
const router = express.Router();

const {
  getEspecialidades,
  createEspecialidad
} = require('../controllers/especialidad.controller');

router.get('/', getEspecialidades);
router.post('/', createEspecialidad);

module.exports = router;