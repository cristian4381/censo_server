
//const usuario = require('../models/usuario');
const Mensaje = require('../models/mensaje');
const Usuario =require('../models/usuario')

const usarioConectado = async (uid =" ")=>{
    const usuario = await Usuario.findById(uid);

    usuario.online = true;

    await usuario.save();
    
    return usuario;
}


const usarioDesconectado = async (uid =" ")=>{
    const usuario = await Usuario.findById(uid);

    usuario.online = false;

    await usuario.save();
    
    return usuario;
}

const grabarMensaje = async(payload)=>{
    /*
        {
            de: '',
            para: '',
            texto: ''
        }
    
    */
    try {
        const mensaje = Mensaje(payload);
        await mensaje.save();
    } catch (error) {
        console.log(error);
        return false
    }
}

module.exports={
    usarioConectado,
    usarioDesconectado,
    grabarMensaje
}