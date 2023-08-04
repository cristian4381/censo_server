const Sequelize = require('sequelize');
const sequelize = require('../database/config_mysql');
const Familia = require('./familia');
const TipoEstablecimiento = require('./tipo_establecimiento');

const EstablecimientosPublicos = sequelize.define('establecimientos_publicos', {
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
  tipo: {
    type: Sequelize.INTEGER,
    references: {
      model: TipoEstablecimiento,
      key: 'id'
    }
  }
}, {
  freezeTableName: true,
  timestamps: false
});

module.exports = EstablecimientosPublicos;
