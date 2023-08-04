const express = require('express');

const path = require('path');
const session = require('express-session');
const viewsRoutes = require('./routes/views');
const { body } = require('express-validator');
require('dotenv').config();





// App de Express
const app = express();


//Lecuta y parseo del boy
app.use(express.json());

// Node Server
const server = require('http').createServer(app);


// Path público
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static( publicPath ) );



//Rutas
app.use('/api/login', require('./routes/auth'));
app.use('/api/censo', require('./routes/censo'));


/*######## nuevo ######## */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));



app.use(express.urlencoded({extended:false}));



app.use('/', viewsRoutes);
/*
app.get('/', (req, res)=> {
	if (req.session.loggedin) {
 		res.render('dashboard');
	} else {
		res.render("login");
	}
});

app.post('/auth', async (req, res)=> {
	const user = req.body.correo;
	const pass = req.body.password;    

	

	res.render('login', {
		alert: true,
		alertTitle: "Error",
		alertMessage: "USUARIO y/o PASSWORD incorrectas",
		alertIcon:'error',
		showConfirmButton: true,
		timer: false,
		ruta: ''    
	});

});
*/


/*######## nuevo ######## */

server.listen( process.env.PORT, ( err ) => {

    if ( err ) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT );

});

//app.use('/',viewsRoutes);
