const Sequelize = require("sequelize");
const sequelize = require("../database/config_mysql");

const Comunidad = require("./comunidad");
const Persona = require("./persona");
const Vivienda = require("./vivienda");
const DetalleFamilia = require("./detalle_familia");


const Familia = sequelize.define("familia",{
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    no_familia: {
      type: Sequelize.INTEGER,
    },
    comunidad: {
      type: Sequelize.INTEGER,
      references: {
        model: Comunidad,
        key: "id",
      },
    },
    vivienda: {
      type: Sequelize.INTEGER,
      references: {
        model: Vivienda,
        key: "id",
      },
    },
    jefe_familia: {
      type: Sequelize.INTEGER,
      references: {
        model: Persona,
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Familia.hasMany(DetalleFamilia,{as : 'DetalleFamilia', foreignKey:'Familia'});
Familia.hasOne(Comunidad,{as : 'Comunidad', foreignKey:'id'});
Familia.belongsTo(Persona,{as : 'Persona', foreignKey: 'jefe_familia'});
Familia.belongsTo(Vivienda,{as : 'Vivienda', foreignKey:'vivienda'});
Vivienda.hasMany(Familia,{as : 'Familia', foreignKey:'vivienda'});




module.exports = Familia;
