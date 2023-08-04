const express = require('express');
const LoginController = require('../controllers/loginCrontoller');
const dashboar = require('../controllers/dashboar')
const router = express.Router();

router.get('/', LoginController.index);
router.get('/ver_datos', dashboar.verDatos);
router.get('/buscar_comunidad', dashboar.buscarComunidad);
router.get('/buscar_familia', dashboar.buscarFamilia);
router.post('/auth', LoginController.auth);
router.get('/logout', LoginController.logout);
router.post('/ver_familas', dashboar.verFamilia);
router.post('/ver_Datos_famila', dashboar.verDatosFamilia);

module.exports = router;