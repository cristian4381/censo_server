/*
    path: api/login

*/


const { Router} = require('express');
const { check } = require('express-validator');
const { crearUsuario,login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/new',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('correo','El correo no es valido').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    check('rol','El rol es obligatoria').not().isEmpty(),

    validarCampos
],crearUsuario);

router.post('/',[
    check('correo','El correo no es valido').isEmail().not().isEmpty(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login)

//validarJWT
router.get('/renew', validarJWT, renewToken );

module.exports=router;