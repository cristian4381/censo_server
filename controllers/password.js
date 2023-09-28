//const nodemailer = require('nodemailer');
const transporter = require("../helpers/mailer");
const Usuario = require("../models/usuario");
const bcrypt = require('bcryptjs');


  
const recuperarPassword = async (req, res = response) =>{
    try{
        console.log("recuperar password")
        console.log(req.body)
        const correo = req.body.correo_recuperacion;
        const usuarioDB = await Usuario.findOne({where: {correo}});
        console.log(usuarioDB);
        if(!usuarioDB){
          return res.status(400).json({
              ok: false,
              msg: 'correo no encontrado'
          });
        }

        const nuevoPassword = generarPassword();

        const salt= bcrypt.genSaltSync();
        usuarioDB.password = bcrypt.hashSync(nuevoPassword, salt);
        await usuarioDB.save();

        res.json({
            ok: true,
            "nuevo_password" : nuevoPassword,
            msg: "Contraseña restablecida!!!",
        });
    }catch (error){
        console.log(error);
        res.json({
          ok: true,
          msg: "Error no se pudo obtener la infomacion solicitada",
        });
    }
}

const cambiarPassword = async (req, res = response) =>{
  console.log(req.body);
  const{correo, oldPassword, newPassword}=req.body; 
  try {
    const usuarioDB = await Usuario.findOne({where: {correo}});
    console.log(usuarioDB);
    if(!usuarioDB){
        return res.status(400).json({
            ok: false,
            msg: 'Email no encontrado'
        });
    }

    //validar password
    const validPassword = bcrypt.compareSync(oldPassword, usuarioDB.password);

    if(!validPassword){
      console.log('contraseña incorrecta');
      return res.status(400).json({
        ok: false,
        msg: 'contraseña incorrecta encontrado'
      });
    }

    //encriptar contraseña
    const salt= bcrypt.genSaltSync();
    usuarioDB.password = bcrypt.hashSync(newPassword, salt);
    await usuarioDB.save();

    console.log('contraseña cambiada');

    res.json({
      ok: true,
      msg: 'Contraseña cambiada',
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Ocurrio un error'
    });
  }
}

const generarPassword = () => {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*_=+[]{}';
  const longitud = 8;
  let contrasena = '';

  for (let i = 0; i < longitud; i++) {
    const caracterAleatorio = caracteres[Math.floor(Math.random() * caracteres.length)];
    contrasena += caracterAleatorio;
  }

  return contrasena;
}

module.exports = {
  recuperarPassword,
  cambiarPassword
}