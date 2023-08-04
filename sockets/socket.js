const { usarioConectado, usarioDesconectado, grabarMensaje } = require('../controllers/socket');
const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');


// Mensajes de Sockets
io.on('connection', (client) => {
    console.log('Cliente conectado');
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);



    //verificar autenticacion 
    if(!valido){return client.disconnect();}
    
    //Cliente autenticado
    usarioConectado(uid);

    //ingresar al usuario en una sala en particular
    client.join( uid);

    //escuchar del cliente el mensaje personal
    client.on('mensaje-personal', async (payload)=>{
        //grabar mensaje
        await grabarMensaje(payload);
        io.to(payload.para).emit('mensaje-personal',payload);
    });


    client.on('disconnect', () => {
        //console.log('Cliente desconectado');
        usarioDesconectado(uid);
    });
/*
    client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);

        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    });
*/

});
