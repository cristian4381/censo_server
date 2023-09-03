const Sequelize = require('sequelize');
const sequelize = require('../database/config_mysql');
const Familia = require('./familia');
const Comunidad = require('./comunidad');
const GestionAmbiental = require('./gestion_ambiental');
const Usuario = require('./usuario');
const Sector = require('./sector');

const Censo = sequelize.define('censo', {
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
  comunidad: {
    type: Sequelize.INTEGER,
    references: {
      model: Comunidad,
      key: 'id'
    }
  },
  sector: {
    type: Sequelize.INTEGER,
    references: {
      model: Sector,
      key: 'id'
    }
  },
  gestion_ambiental: {
    type: Sequelize.INTEGER,
    references: {
      model: GestionAmbiental,
      key: 'id'
    }
  },
  registro: {
    type: Sequelize.INTEGER,
    references: {
      model: Usuario,
      key: 'id'
    }
  },
  fecha_registro: {
    type: Sequelize.DATE
  }
}, {
  freezeTableName: true,
  timestamps: false
});

Censo.belongsTo(Familia,{as : 'Familia', foreignKey: 'familia'});
Censo.belongsTo(GestionAmbiental,{ as : 'GestionAmbiental',foreignKey: 'gestion_ambiental'});
GestionAmbiental.hasMany(Censo, {as : 'Censo',foreignKey:'gestion_ambiental'})

/*Familia.belongsTo(Vivienda,{as : 'Vivienda', foreignKey:'vivienda'});
Vivienda.hasMany(Familia,{as : 'Familia', foreignKey:'vivienda'}); */


module.exports = Censo;