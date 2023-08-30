const Sequelize = require('sequelize');
const sequelize = require('../database/config_mysql');

const Familia = require('./familia');
const Persona = require('./persona');

const DetalleFamilia = sequelize.define('detalle_familia', {
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
  miembro: {
    type: Sequelize.INTEGER,
    references: {
      model: Persona,
      key: 'id'
    }
  }
}, {
  freezeTableName: true,
  timestamps: false
});

DetalleFamilia.hasMany(Persona, { as: "Miembro" , foreignKey: "id"});
Persona.hasOne(DetalleFamilia,{as: 'detalle', foreignKey: 'miembro'});
module.exports = DetalleFamilia;

