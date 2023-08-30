const Ambiente = require("../models/ambiente");
const Comunidad = require("../models/comunidad");

const Persona = require("../models/persona");

const Familia = require("../models/familia");
const DetalleFamilia = require("../models/detalle_familia");
const Vivienda = require("../models/vivienda");
const Pared = require("../models/pared");

const Piso = require("../models/piso");
const Techo = require("../models/techo");
const Tenencia = require("../models/tenencia");
const TipoCocina = require("../models/tipo_cocina");
const UbicacionCocina = require("../models/ubicacion_cocina");
const Escolaridad = require("../models/escolaridad");

const sequelize = require("../database/config_mysql");

const Censo = require("../models/censo");
const { where } = require("sequelize");
const GestionAmbiental = require("../models/gestion_ambiental");


const AbastecimientoAgua = require("../models/abastecimiento_agua");
const DisposicionExcretas = require("../models/disposicion_excretas");
const DisposicionAguasReciduales = require("../models/disposicion_aguas_reciduales");
const DisposicionDesechosSolidos = require("../models/disposicion_desechos_solidos");
const Mascotas = require("../models/mascota");
const TipoMascota = require("../models/tipo_mascota");
const Embarazada = require("../models/embarazada");


const verDatos = async (req, res) => {

  if (!req.session.loggedin) {
    return res.redirect('/')
  }

  const comunidades = await Comunidad.findAll();

  res.render("ver_datos",{ comunidades});
};

const ver_embarzadas = async (req, res) => {
  if (!req.session.loggedin) {
    return res.redirect('/')
  }
  const comunidades = await Comunidad.findAll();

  res.render("buscar_embarazada",{ comunidades});
};

const buscarEmabarazadas = async (req, res) => {
  const noComunidad = req.query.comunidad;
  console.log("NO. comunidad: "+noComunidad);

  try {
    const result = await Embarazada.findAll({
      include: [
        {
          model: Persona,
          as: 'PersonaE',
          required: true,
          include: [
            {
              model: DetalleFamilia,
              as: 'detalle',
              attributes: ['familia'],
              include: [
                {
                  model: Familia,
                  as: 'detalleF',
                  attributes: ['no_familia'],
                  where: {
                    comunidad: noComunidad,
                  },
                  required: true,
                },
              ],
              required: true,
            },
          ]
        }
      ]
    });
  
    console.log(result);
  
    res.json(result);
  } catch (error) {
    res.json({
      ok: 'false'
    })
  }

}

const buscarFamilia = async (req, res) => {
  if (!req.session.loggedin) {
    return res.redirect('/')
  }
  res.render("buscar_familia");
};



const verFamilia = async (req,res) =>{
	console.log('\n\n'+req.body.id_cuminidad+'\n\n'); 

  const resultado = await Censo.findAll({
    attributes: [
      [sequelize.col('censo.fecha_registro'), 'fecha_registro'],
      [sequelize.col('censo.familia'), 'id_familia'],
      [sequelize.col('Familia.Vivienda.no_vivienda'), 'no_vivienda'],
      [sequelize.fn('COUNT', sequelize.col('Familia.DetalleFamilia.familia')), 'miembros_familia'],
      [sequelize.col('Familia.Persona.nombre'), 'nombre_jefe_familia'],
      [sequelize.col('Familia.Persona.ocupacion'), 'ocupacion'],
      [sequelize.col('Familia.Persona.Escolaridad.tipo'), 'escolaridad'],
    ],
    include: [
      {
        model: Familia,
        as: 'Familia',
        attributes: [],
        require: true,
        include: [
          {
            model: DetalleFamilia,
            as: 'DetalleFamilia',
            attributes: [],
            require: true,
          },
          {
            model: Persona,
            as: 'Persona',
            require: true,
            attributes: [],
            include:[
              {
                model: Escolaridad,
                as: 'Escolaridad',
                attributes: [],
                require: true
              },
            ]
          },
          {
            model: Vivienda,
            as: 'Vivienda',
            attributes: [],
            require: true,
          }
        ]
      }
    ],
    where: {
      comunidad: req.body.id_cuminidad
    },
    group: ['Familia.DetalleFamilia.familia','censo.id']
  });

  //console.log(resultado[0]);
  
	res.json(resultado);

  //await buscarFamilias(req.body.id_cuminidad);
}
const verDatosFamilia = async (req,res) =>{
  const idFamilia = req.body.id;
  const personas = await DetalleFamilia.findAll({
    attributes: [
      [sequelize.col('Miembro.nombre'), 'nombre'],
      [sequelize.col('Miembro.sexo'), 'sexo'],
      [sequelize.col('Miembro.fecha_nacimiento'), 'fecha_nacimiento'],
      [sequelize.col('Miembro.ocupacion'), 'ocupacion'],
      [sequelize.col('Miembro.sabe_leer'), 'sabe_leer'],
      [sequelize.col('Miembro.Escolaridad.tipo'), 'escolaridad'],
    ],
    include: [
      {
        model: Persona,
        as: 'Miembro',
        attributes: [],
        include: [
          {
            model: Escolaridad,
            as: 'Escolaridad',
            attributes: [],
            require: true
          },
        ],
      },
    ],
    where :{
      familia: idFamilia
    },
  });
console.log(personas);
  const vivienda = await Vivienda.findOne({
    attributes: [
      'no_vivienda',
      'cielo',
      'iluminacion',
      'ventilacion',
      [sequelize.col('Piso.tipo'), 'piso'],
      [sequelize.col('Pared.tipo'), 'pared'],
      [sequelize.col('Techo.tipo'), 'techo'],
      [sequelize.col('Ambiente.tipo'), 'ambiente'],
      [sequelize.col('UbicacionCocina.ubicacion'), 'ubicacion cocina'],
      [sequelize.col('TipoCocina.tipo'), 'tipo Cocina'],
      [sequelize.col('Tenencia.tipo'), 'tenencia']
    ],
    include: [
      {model: Piso, as : 'Piso', attributes: [],required: true},
      {model: Pared,as : 'Pared', attributes: [],required: true},
      {model: Techo,as : 'Techo', attributes: [],required: true},
      {model: Ambiente,as : 'Ambiente',attributes: [],required: true},
      {model: UbicacionCocina,as : 'UbicacionCocina',attributes: [],required: true},
      {model: TipoCocina,as : 'TipoCocina',attributes: [],required: true},
      {model: Tenencia,as : 'Tenencia',attributes: [],required: true},
      {
        model: Familia,
        as : 'Familia',
        attributes: [], 
        required: true,
        where :{
          id : idFamilia
        }
      }
    ],

  });
  
  const gestionAmbiental = await GestionAmbiental.findOne({
    attributes: [
      [sequelize.col('AbastecimientoAgua.tipo'), 'Abastecimiento de Agua'],
      [sequelize.col('DisposicionExcretas.tipo'), 'Disposicion de Excretas'],
      [sequelize.col('DisposicionAguasReciduales.tipo'), 'Disposicion de Aguas Reciduales'],
      [sequelize.col('DisposicionDesechosSolidos.tipo'), 'Disposicion de Desechos Solidos'],
    ],
    include: [
      { model: AbastecimientoAgua,as: 'AbastecimientoAgua',attributes: [],required: true},
      { model: DisposicionExcretas, as: "DisposicionExcretas", attributes: [], required: true},
      { model: DisposicionAguasReciduales, as: "DisposicionAguasReciduales", attributes: [], required: true},
      { model: DisposicionDesechosSolidos, as: "DisposicionDesechosSolidos", attributes: [], required: true},
      {
        model: Censo,
        as: "Censo",
        attributes: [],
        required: true,
        where: { familia: idFamilia },
      },
    ],
  });

  const mascotas = await Mascotas.findAll({
    attributes:[
      'cantidad',
      'ubicacion',
      [sequelize.col('TipoMascota.tipo'), 'Tipo_mascota']
    ],
    include: [
      {
        model: TipoMascota,
        as: 'TipoMascota',
        attributes: [],
        required: true
      }
    ],
    where: {
      familia: idFamilia
    }
  })

  console.log(vivienda);
  console.log(gestionAmbiental);
  console.log(mascotas);
  res.json({
    familia:personas, 
    vivienda,
    gestionAmbiental,
    mascotas: mascotas
  });
}


const buscarFamilias = async (id) => {
  const familias = await Censo.findAll({
    attributes: [
      [sequelize.col('censo.fecha_registro'), 'fecha_registro'],
      [sequelize.col('censo.familia'), 'id_familia'],
      [sequelize.col('Familia.Vivienda.no_vivienda'), 'no_vivienda'],
      [sequelize.fn('COUNT', sequelize.col('Familia.DetalleFamilia.familia')), 'miembros_familia'],
      [sequelize.col('Familia.Persona.nombre'), 'nombre_jefe_familia'],
      [sequelize.col('Familia.Persona.ocupacion'), 'ocupacion'],
      [sequelize.col('Familia.Persona.Escolaridad.tipo'), 'escolaridad'],
    ],
    include: [
      {
        model: Familia,
        as: 'Familia',
        attributes: [],
        require: true,
        include: [
          {
            model: DetalleFamilia,
            as: 'DetalleFamilia',
            attributes: [],
            require: true,
          },
          {
            model: Persona,
            as: 'Persona',
            require: true,
            attributes: [],
            include:[
              {
                model: Escolaridad,
                as: 'Escolaridad',
                attributes: [],
                require: true
              },
            ]
          },
          {
            model: Vivienda,
            as: 'Vivienda',
            attributes: [],
            require: true,
          }
        ]
      }
    ],
    where: {
      comunidad: id
    },
    group: ['Familia.DetalleFamilia.familia','censo.id']
  });

  console.log(familias[4]);

  // Aquí tienes los resultados en `viviendas`, que incluyen los datos que necesitas.
};

module.exports = {
  verDatos,
  ver_embarzadas,
  buscarEmabarazadas,
  buscarFamilia,
  verFamilia,
  verDatosFamilia
};
