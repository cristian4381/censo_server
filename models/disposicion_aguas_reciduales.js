const Sequelize = require('sequelize');
const sequelize = require('../database/config_mysql');

const DisposicionAguasReciduales = sequelize.define('disposicion_aguas_reciduales', {
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

module.exports = DisposicionAguasReciduales;
