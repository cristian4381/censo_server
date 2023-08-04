const { response } = require("express");
const Mensjes = require('../models/mensaje')

const getMensjes = async (req, res=response)=>{
    //paginacion: mandar desde que numero registro
   // const desde  = Number(req.require = response)|| 0; 
    
    //const usuarios= await Usuario.find()
        
        //.skip(desde) 
        //.limit(2) //limite de datos a mandar
    
    const miId= req.uid;
    const mensajeDe= req.params.de;

    const mensajes= await Mensjes.find({
        $or: [{de: miId, para: mensajeDe},{de: mensajeDe, para: miId}]
    })
    .sort({createdAt: 'desc'})
    .limit(30);


    res.json({
        ok: true,
        mensajes
    });
}

module.exports={
    getMensjes
}