const Sequelize = require('sequelize');
const sequelize = require('../database/config_mysql');
const Familia = require('./familia');

const Ubicacion = sequelize.define('ubicacion', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  familia: {
    type: Sequelize.INTEGER,
    references: {
      model: Familia,
      key: 'id'
    }
  },
  longitud: {
    type: Sequelize.DOUBLE
  },
  latitud: {
    type: Sequelize.DOUBLE
  }
}, {
  freezeTableName: true,
  timestamps: false
});

module.exports = Ubicacion;


