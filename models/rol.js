const Sequelize = require('sequelize');
const sequelize = require('../database/config_mysql');

const Rol = sequelize.define('Rol', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tipo: {
    type: Sequelize.STRING(50)
  }
});
  
  // También puedes agregar relaciones y métodos personalizados aquí
  
module.exports = Rol;