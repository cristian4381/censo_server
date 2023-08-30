const Sequelize = require('sequelize');
const sequelize = require('../database/config_mysql');

const UbicacionCocina = sequelize.define('ubicacion_cocina', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ubicacion: {
    type: Sequelize.STRING(50)
  }
}, {
  freezeTableName: true,
  timestamps: false
});

module.exports = UbicacionCocina;