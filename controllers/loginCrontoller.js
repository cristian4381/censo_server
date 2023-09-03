const { response} = require('express');
const Usuario=require('../models/usuario');
const bcrypt = require('bcryptjs');
const Censo = require('../models/censo');
const sequelize = require('../database/config_mysql');
const { Op } = require('sequelize');

const index = async (req, res)=>{
    if (req.session.loggedin) {
		const today = new Date(); // Obtiene la fecha actual
		today.setHours(0, 0, 0, 0); // Establece la hora a las 00:00:00

		const tomorrow = new Date(today);
		tomorrow.setDate(tomorrow.getDate() + 1); // Añade un día para obtener el final del día actual (23:59:59)

		const registrosSemana = await Censo.count({
			where: {
			  fecha_registro: {
				[Op.and]: [
				  sequelize.where(sequelize.fn('WEEK', sequelize.col('fecha_registro'), 1), '=', sequelize.fn('WEEK', sequelize.fn('CURDATE'), 1)),
				  sequelize.where(sequelize.fn('YEAR', sequelize.col('fecha_registro')), '=', sequelize.fn('YEAR', sequelize.fn('CURDATE')))
				]
			  }
			}
		});
		const registroDia = await Censo.count({
			where: {
			  fecha_registro: {
				[Op.gte]: today, // Mayor o igual que la fecha a las 00:00:00 del día actual
				[Op.lt]: tomorrow, // Menor que el final del día actual (23:59:59)
			  },
			}
		});
		console.log(today);
		const total = await Censo.count();
        // Output username
        res.render("dashboard",{registrosSemana,registroDia,total});
    } else {
        res.render("login");
    }
}



const auth = async (req, res = response)=>{
    let correo = req.body.correo;
	let password = req.body.password;
    try {

        const usuarioDB = await Usuario.findOne({where: {correo}});
        console.log(usuarioDB);
        if(!usuarioDB){
            return res.render('login', {
		        alert: true,
		        alertTitle: "Error",
		        alertMessage: "Credenciales invalidas",
		        alertIcon:'error',
		        showConfirmButton: true,
		        timer: false,
		        ruta: ''    
	        });
        }

        //validar password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if(!validPassword){
            return res.render('login', {
		        alert: true,
		        alertTitle: "Error",
		        alertMessage: "Credenciales invalidas",
		        alertIcon:'error',
		        showConfirmButton: true,
		        timer: false,
		        ruta: ''    
	        });
        }

        req.session.loggedin = true;                
		    res.render('login', {
		    	alert: true,
		    	alertTitle: "Conexión exitosa",
		    	alertMessage: "¡LOGIN CORRECTO!",
		    	alertIcon:'success',
		    	showConfirmButton: false,
		    	timer: 1500,
		    	ruta: ''
		    }
        );      
        
    } catch (error) {
        console.log(error);
        return res.render('login', {
		    alert: true,
		    alertTitle: "Error",
		    alertMessage: "Intente mas tarde",
		    alertIcon:'error',
		    showConfirmButton: true,
		    timer: false,
		    ruta: ''    
	    });
    }
}
function verDatos(req, res) {
  res.render("ver_datos");
}



function logout(req, res) {
  if (req.session.loggedin) {
    req.session.destroy();
  }
  console.log('logout');
  res.redirect('/')
}

module.exports = {
    index,
    auth,
	logout,
	verDatos,
}