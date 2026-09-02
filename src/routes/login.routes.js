const express = require('express');
const router = express.Router();

const { loginController } = require ('../controllers/login.controller.js');


router.post("/", loginController); /*ruta para el login, que llama al controlador loginController*/

module.exports = router;
