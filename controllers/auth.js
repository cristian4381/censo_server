const { response, json } = require('express');
const bcrypt = require('bcryptjs');
const Usuario=require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res=response)=>{

    const {correo,password} = req.body;
    
    try {
        const existeEmail = await Usuario.findOne({where: {correo}});

        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            })
        }

        const usuario = new Usuario(req.body);

        //encriptar contraseña
        const salt= bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            user: usuario.toJSON(),
            token: token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            body: 'Hable con el administrador'
        });
    }

}

const login = async (req, res=response)=>{
    const{correo, password}=req.body;
    console.log('/api/login');
    try {
        console.log(req.body);
        const usuarioDB = await Usuario.findOne({where: {correo}});
        console.log(usuarioDB);
        if(!usuarioDB){
            return res.status(400).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        //validar password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'contraseña incorrecta encontrado'
            });
        }
        

        //Generar JWT
        const token = await generarJWT(usuarioDB.id);


        res.json({
            ok: true,
            user: usuarioDB,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal, Hable con el administrador'
        });
    }
}

const renewToken = async(req, res = response)=>{
    const uid=req.uid;
    const id = req.uid;


    //generar JWT
    const token = await generarJWT(uid);
   
    //obtener el usuario

    const user = await Usuario.findOne({where: {id: id}});
     

    res.json({
        ok: true,
        user,
        token
    });
}

module.exports={
    crearUsuario,
    login,
    renewToken
}