const { Router} = require('express');
const { getChats, createchat } = require('../controllers/chats');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//validarJWT
router.get('/', validarJWT, getChats);

router.get('/new',validarJWT,createchat)

module.exports=router;