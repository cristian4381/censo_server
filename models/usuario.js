const Sequelize = require('sequelize');
const sequelize = require('../database/config_mysql');
const Rol = require('./rol');

const Usuario = sequelize.define('usuario', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: Sequelize.STRING(50)
    },
    correo: {
      type: Sequelize.STRING(50)
    },
    telefono: {
      type: Sequelize.STRING(8)
    },
    password: {
      type: Sequelize.STRING(100)
    },
    rol: {
      type: Sequelize.INTEGER,
      references: {
        model: Rol,
        key: 'id'
      }
    }
  }, {
    freezeTableName: true, // Evitar que Sequelize pluralice el nombre de la tabla
    timestamps: false, // Agregar control de timestamps
  });
  
  Usuario.prototype.toJSON = function() {
    const { id, password, ...object } = this.get();
    object.uid = id;
    return object;
  };
  // También puedes agregar relaciones y métodos personalizados aquí
  
  module.exports = Usuario;