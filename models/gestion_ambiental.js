const Sequelize = require('sequelize');
const sequelize = require('../database/config_mysql');

const AbastecimientoAgua = require('./abastecimiento_agua');
const DisposicionExcretas = require('./disposicion_excretas');
const DisposicionAguasReciduales = require('./disposicion_aguas_reciduales');
const DisposicionDesechosSolidos = require('./disposicion_desechos_solidos');


const GestionAmbiental = sequelize.define('gestion_ambiental', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  abastecimiento_agua: {
    type: Sequelize.INTEGER,
    references: {
      model: AbastecimientoAgua,
      key: 'id'
    }
  },
  disposicion_excretas: {
    type: Sequelize.INTEGER,
    references: {
      model: DisposicionExcretas,
      key: 'id'
    }
  },
  disposicion_aguas_reciduales: {
    type: Sequelize.INTEGER,
    references: {
      model: DisposicionAguasReciduales,
      key: 'id'
    }
  },
  disposicion_desechos_solidos: {
    type: Sequelize.INTEGER,
    references: {
      model: DisposicionDesechosSolidos,
      key: 'id'
    }
  }
}, {
  freezeTableName: true,
  timestamps: false
});

GestionAmbiental.belongsTo(AbastecimientoAgua,{as : 'AbastecimientoAgua',foreignKey: 'abastecimiento_agua'});
GestionAmbiental.belongsTo(DisposicionExcretas,{as : 'DisposicionExcretas',foreignKey: 'disposicion_excretas'});
GestionAmbiental.belongsTo(DisposicionAguasReciduales,{as : 'DisposicionAguasReciduales',foreignKey: 'disposicion_aguas_reciduales'});
GestionAmbiental.belongsTo(DisposicionDesechosSolidos,{as : 'DisposicionDesechosSolidos',foreignKey: 'disposicion_desechos_solidos'});


module.exports = GestionAmbiental;

