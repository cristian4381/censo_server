const Sequelize = require('sequelize');
const sequelize = require('../database/config_mysql');
const persona = require('./persona');

const Embarazada = sequelize.define('embarazada', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  persona: {
    type: Sequelize.INTEGER,
    references: {
      model: persona,
      key: 'id'
    }
  },
  tiempo_gestacion: {
    type: Sequelize.STRING
  },
  lleva_control: {
    type: Sequelize.ENUM('Si', 'No')
  },
  lugar_control: {
    type: Sequelize.STRING(100)
  },
  telefono: {
    type: Sequelize.STRING(8)
  }
}, {
  freezeTableName: true,
  timestamps: false
});
// DetalleFamilia.hasMany(Persona, { as: "Miembro" , foreignKey: "id"});
//persona.hasMany(Embarazada, { as: "Embarazada" , foreignKey: "persona"});
Embarazada.belongsTo(persona, { as: "PersonaE" , foreignKey: "persona"});
module.exports = Embarazada;
