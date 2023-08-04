const Sequelize = require('sequelize');
const sequelize = require('../database/config_mysql');

const Techo = sequelize.define('techo', {
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




module.exports = Techo;
