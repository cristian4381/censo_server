/*
    path: api/mensjes

*/

const { Router} = require('express');
const { getMensjes } = require('../controllers/mensajes');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//validarJWT
router.get('/:de', validarJWT, getMensjes);

module.exports=router;