const { response } = require("express");
const Usuario = require('../models/usuario')

const getUsuarios = async (req, res=response)=>{
    //paginacion: mandar desde que numero registro
    const desde  = Number(req.require = response)|| 0; 
    
    const usuarios= await Usuario.find()
        .find({_id:{$ne: req.uid}})
        .sort('-online')
        //.skip(desde) 
        //.limit(2) //limite de datos a mandar
    
    res.json({
        ok: true,
        usuarios
    });
}

module.exports={
    getUsuarios
}