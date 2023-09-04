const express = require('express');
const LoginController = require('../controllers/loginCrontoller');
const dashboar = require('../controllers/dashboar')
const generarExcel = require('../controllers/generarExcel');
const router = express.Router();

router.get('/', LoginController.index);
router.get('/ver_datos', dashboar.verDatos);
router.get('/ver_embarzadas', dashboar.ver_embarzadas);
router.get('/buscar_embarzadas', dashboar.buscarEmabarazadas);
router.get('/buscar_familia', dashboar.buscarFamilia);
router.post('/auth', LoginController.auth);
router.get('/logout', LoginController.logout);
router.post('/ver_familas', dashboar.verFamilia);
router.post('/ver_Datos_famila', dashboar.verDatosFamilia);
router.get('/buscarSectores',dashboar.buscarSectores);

router.get('/excelGestacion', generarExcel.excelGestacion)

module.exports = router;