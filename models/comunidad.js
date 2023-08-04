const Sequelize = require('sequelize');
const sequelize = require('../database/config_mysql');

const Comunidad = sequelize.define('comunidad', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: Sequelize.STRING(50),

  }
}, {
  freezeTableName: true,
  timestamps: false
});

module.exports = Comunidad;