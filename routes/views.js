const express = require('express');
const LoginController = require('../controllers/loginCrontoller');
const dashboar = require('../controllers/dashboar')
const generarExcel = require('../controllers/generarExcel');
const { recuperarPassword } = require('../controllers/password');
const { validarCampos } = require('../middlewares/validar-campos');
const router = express.Router();
const { check } = require('express-validator');

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
router.get('/cambiar_password', dashboar.cambiarPassword);
router.post('/recuperar_password',[
    check('correo_recuperacion','El correo no es valido').isEmail().not().isEmpty(),
    validarCampos
], recuperarPassword);

router.get('/excelGestacion', generarExcel.excelGestacion)

module.exports = router;