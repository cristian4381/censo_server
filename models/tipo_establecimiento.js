const Sequelize = require('sequelize');
const sequelize = require('../database/config_mysql');

const TipoEstablecimiento = sequelize.define('tipo_establecimiento', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tipo: {
    type: Sequelize.STRING(50)
  }
}, {
  freezeTableName: true,
  timestamps: false
});

module.exports = TipoEstablecimiento;
