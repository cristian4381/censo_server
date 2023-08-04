const Sequelize = require('sequelize');
const sequelize = require('../database/config_mysql');

const Persona = require("./persona");

const JefeFamilia = sequelize.define(
  "jefe_familia",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    persona: {
      type: Sequelize.INTEGER,
      references: {
        model: Persona,
        key: "id",
      },
    },
    estado_civil: {
      type: Sequelize.STRING(50),
    },
    religion: {
      type: Sequelize.STRING(50),
    },
    procedencia: {
      type: Sequelize.STRING(75),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = JefeFamilia;
