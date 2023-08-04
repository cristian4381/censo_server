const Sequelize = require("sequelize");
const sequelize = require("../database/config_mysql");

const Escolaridad = require("./escolaridad");

const Persona = sequelize.define('persona',{
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: Sequelize.STRING(50),
    },
    sexo: {
      type: Sequelize.ENUM("Masculino", "Femenino"),
    },
    fecha_nacimiento: {
      type: Sequelize.DATE,
    },
    ocupacion: {
      type: Sequelize.STRING(75),
    },
    sabe_leer: {
      type: Sequelize.ENUM("si", "no"),
    },
    escolaridad: {
      type: Sequelize.INTEGER,
      references: {
        model: Escolaridad,
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
Persona.belongsTo(Escolaridad,{as : 'Escolaridad',foreignKey:'escolaridad'})
//Escolaridad.hasMany(Persona,{as : 'Escolaridad', foreignKey: 'escolaridad'})
module.exports = Persona;
