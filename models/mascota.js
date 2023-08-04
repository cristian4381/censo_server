const Sequelize = require('sequelize');
const sequelize = require('../database/config_mysql');
const Familia = require('./familia');
const TipoMascota = require('./tipo_mascota');

const Mascotas = sequelize.define('mascotas', {
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
  tipo_mascota: {
    type: Sequelize.INTEGER,
    references: {
      model: TipoMascota,
      key: 'id'
    }
  },
  ubicacion: {
    type: Sequelize.ENUM('Adecuando', 'Inadecuado')
  },
  cantidad: {
    type: Sequelize.INTEGER
  }
}, {
  freezeTableName: true,
  timestamps: false
});

Mascotas.belongsTo(TipoMascota,{as: 'TipoMascota', foreignKey: 'tipo_mascota'});
TipoMascota.hasMany(Mascotas,{as: 'Mascota', foreignKey: 'tipo_mascota'})

module.exports = Mascotas;
