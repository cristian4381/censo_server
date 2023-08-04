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
    type: Sequelize.INTEGER
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

module.exports = Embarazada;
