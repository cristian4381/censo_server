const Sequelize = require('sequelize');

// Configuración de la conexión a la base de datos MySQL
const sequelize = new Sequelize('censo', 'root', '12345678', {
  host: 'localhost',
  dialect: 'mysql',
});


module.exports=sequelize;