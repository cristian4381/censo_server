const Sequelize = require('sequelize');
const sequelize = require('../database/config_mysql');
const Comunidad = require('./comunidad');

const Sector = sequelize.define('sector',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
      type: Sequelize.STRING(50),
    },
    comunidad: {
        type: Sequelize.INTEGER,
        references:{
            model : Comunidad,
            key : 'id'
        }
    }
    }, {
      freezeTableName: true,
      timestamps: false
});



module.exports = Sector;