/*
    path: api/censo

*/
const { Router} = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { crear,getInformacion, sicronizarBoletas } = require('../controllers/censo');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/new',[
    // check('nombre','El nombre es obligatorio').not().isEmpty(),
    // check('correo','El nombre no es valido').isEmail(),
    // check('password','La contraseña es obligatoria').not().isEmpty(),
    // check('rol','El rol es obligatoria').not().isEmpty(),

    // validarCampos
],crear);

router.post('/sicronizar',[

],sicronizarBoletas);

router.get('/informacion',validarJWT,getInformacion);


module.exports=router;