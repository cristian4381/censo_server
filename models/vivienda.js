const Sequelize = require('sequelize');
const sequelize = require('../database/config_mysql');

const Piso = require('./piso');
const Pared = require('./pared');
const Techo = require('./techo');
const Ambiente = require('./ambiente');
const UbicacionCocina = require('./ubicacion_cocina');
const TipoCocina = require('./tipo_cocina');
const Tenencia = require('./tenencia');
const Familia = require('./familia');

const Vivienda = sequelize.define('vivienda', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  no_vivienda: {
    type: Sequelize.INTEGER
  },
  cielo: {
    type: Sequelize.ENUM('tiene', 'no tiene')
  },
  ventilacion: {
    type: Sequelize.ENUM('buena', 'mala')
  },
  iluminacion: {
    type: Sequelize.ENUM('buena', 'mala')
  },
  piso: {
    type: Sequelize.INTEGER,
    references: {
      model: Piso,
      key: 'id'
    }
  },
  pared: {
    type: Sequelize.INTEGER,
    references: {
      model: Pared,
      key: 'id'
    }
  },
  techo: {
    type: Sequelize.INTEGER,
    references: {
      model: Techo,
      key: 'id'
    }
  },
  ambiente: {
    type: Sequelize.INTEGER,
    references: {
      model: Ambiente,
      key: 'id'
    }
  },
  ubicacion_cocina: {
    type: Sequelize.INTEGER,
    references: {
      model: UbicacionCocina,
      key: 'id'
    }
  },
  tipo_cocina: {
    type: Sequelize.INTEGER,
    references: {
      model: TipoCocina,
      key: 'id'
    }
  },
  tenencia: {
    type: Sequelize.INTEGER,
    references: {
      model: Tenencia,
      key: 'id'
    }
  }
}, {
  freezeTableName: true,
  timestamps: false
});

//Familia.hasMany(DetalleFamilia,{as : 'DetalleFamilia', foreignKey:'Familia'});
Vivienda.belongsTo(Piso,{as : 'Piso',foreignKey:'piso'});
Vivienda.belongsTo(Pared,{as : 'Pared',foreignKey:'pared'});
Vivienda.belongsTo(Techo,{as : 'Techo',foreignKey:'techo'});
Vivienda.belongsTo(Ambiente,{as : 'Ambiente',foreignKey:'ambiente'});
Vivienda.belongsTo(UbicacionCocina,{as : 'UbicacionCocina',foreignKey:'ubicacion_cocina'});
Vivienda.belongsTo(TipoCocina,{as : 'TipoCocina',foreignKey:'tipo_cocina'});
Vivienda.belongsTo(Tenencia,{as : 'Tenencia',foreignKey:'tenencia'});

module.exports = Vivienda;
