const Sequelize = require('sequelize');
const sequelize = require('../database/config_mysql');
const Sector = require('./sector');

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

Comunidad.hasMany(Sector,{as : 'Sector',foreignKey:'comunidad'});

module.exports = Comunidad;