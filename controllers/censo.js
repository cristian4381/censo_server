const { response, json } = require("express");

const Sequelize = require("sequelize");
const sequelize = require("../database/config_mysql");

// Importar los modelos
const AbastecimientoAgua = require("../models/abastecimiento_agua");
const Ambiente = require("../models/ambiente");
const Censo = require("../models/censo");
const Comunidad = require("../models/comunidad");
const DetalleFamilia = require("../models/detalle_familia");
const DisposicionAguasReciduales = require("../models/disposicion_aguas_reciduales");
const DisposicionDesechosSolidos = require("../models/disposicion_desechos_solidos");
const DisposicionExcretas = require("../models/disposicion_excretas");
const Embarazada = require("../models/embarazada");
const Escolaridad = require("../models/escolaridad");
const EstablecimientosPublicos = require("../models/establecimientos_publicos");
const Familia = require("../models/familia");
const GestionAmbiental = require("../models/gestion_ambiental");
const Mascota = require("../models/mascota");
const Pared = require("../models/pared");
const Persona = require("../models/persona");
const Piso = require("../models/piso");
const Techo = require("../models/techo");
const TipoCocina = require("../models/tipo_cocina");
const TipoEstablecimiento = require("../models/tipo_establecimiento");
const TipoMascota = require("../models/tipo_mascota");
const UbicacionCocina = require("../models/ubicacion_cocina");
const Vivienda = require("../models/vivienda");
const JefeFamilia = require("../models/jefe_familia");
const Tenencia = require("../models/tenencia");
const EstadoCivil = require("../models/estado_civil");
const Religion = require("../models/religion");
const Procedencia = require("../models/procedencia");
const Ubicacion = require("../models/ubicacion");
const Sector = require("../models/sector");

const crear = async (req, res = response) => {
  //const censo = new Censo(res.body);

  const transaction = await sequelize.transaction();
  const jsonData = req.body;
  try {
    console.log(jsonData);

    /*for (const detalle of jsonData.familia) {
      console.log(detalle.embarazada);
    }*/
    
    // Insertar la vivienda
    const vivienda = await Vivienda.create(jsonData.vivienda, {
      transaction,
    });

    const  ocupacion = jsonData.jefe_familia.ocupacion == '' ? 'No aplica' : jsonData.jefe_familia.ocupacion;
    const sabe_leer = jsonData.jefe_familia.sabe_leer== '' ? 'No aplica' : jsonData.jefe_familia.sabe_leer;

    // Insertar la persona (jefe de familia)
    const jefeFamilia = await Persona.create(
      {
        nombre: jsonData.jefe_familia.nombre,
        sexo: jsonData.jefe_familia.sexo,
        fecha_nacimiento: jsonData.jefe_familia.fecha_nacimiento,
        ocupacion: ocupacion,
        sabe_leer: sabe_leer,
        escolaridad: jsonData.jefe_familia.escolaridad
      },
      {
        transaction
      }
    );
    
    //verificar si el jefe_Familia esta embarazada
    if(JSON.stringify(jsonData.jefe_familia.embarazada) != '{}'){

      await Embarazada.create(
        {
          persona: jefeFamilia.id,
          tiempo_gestacion: jsonData.jefe_familia.embarazada.tiempo_gestacion,
          lleva_control: jsonData.jefe_familia.embarazada.lleva_control,
          lugar_control: jsonData.jefe_familia.embarazada.lugar_control,
          telefono: jsonData.jefe_familia.embarazada.telefono,
        },
        { transaction }
      );
    }
    /*
    // Insertar la persona (jefe de familia)
    const jefeFamilia = await Persona.create(
      jsonData.familia.jefe_familia.persona,
      { transaction }
    );*/

    const jefeFamiliaId = jefeFamilia.id;

    await JefeFamilia.create(
      {
        persona: jefeFamilia.id,
        estado_civil: jsonData.detalle_jefe_familia.estado_civil,
        religion: jsonData.detalle_jefe_familia.religion,
        procedencia: jsonData.detalle_jefe_familia.procedencia
      },
      { 
        transaction 
      }
    );

    

    // Insertar la familia

    const familia = await Familia.create(
      {
        no_familia: jsonData.no_familia,
        comunidad: jsonData.comunidad,
        sector: jsonData.sector,
        vivienda: vivienda.id,
        jefe_familia: jefeFamiliaId,
      },
      { transaction }
    );

    //incertando al jefe de familia en los detalles de la familia
    await DetalleFamilia.create(
      {
        familia: familia.id,
        miembro: jefeFamilia.id,
      },
      { transaction }
    );

    // Insertar los detalles de la familia
    for (const detalle of jsonData.familia) {
      const  _ocupacion = detalle.ocupacion == '' ? 'No aplica' : detalle.ocupacion;
      const _sabe_leer = detalle.sabe_leer== '' ? 'No aplica' : detalle.sabe_leer;
      console.log(_ocupacion);
      console.log(_sabe_leer);
      const miembro = await Persona.create(
        {
          nombre: detalle.nombre,
          sexo: detalle.sexo,
          fecha_nacimiento: detalle.fecha_nacimiento,
          ocupacion: _ocupacion,
          sabe_leer: _sabe_leer,
          escolaridad: detalle.escolaridad
        },
        {
          transaction
        }
      );
      if(JSON.stringify(detalle.embarazada) != '{}'){
        console.log(detalle.embarazada);
        await Embarazada.create(
          {
            persona: miembro.id,
            tiempo_gestacion: detalle.embarazada.tiempo_gestacion,
            lleva_control: detalle.embarazada.lleva_control,
            lugar_control: detalle.embarazada.lugar_control,
            telefono: detalle.embarazada.telefono,
          },
          { transaction }
        );
      }
      await DetalleFamilia.create(
        {
          familia: familia.id,
          miembro: miembro.id,
        },
        { transaction }
      );
    }

    for (const mascota of jsonData.mascotas) {

      await Mascota.create(
        {
          familia: familia.id,
          tipo_mascota: mascota.tipo_mascota,
          ubicacion: mascota.ubicacion,
          cantidad: mascota.cantidad,
        },
        { transaction }
      );

    }
    
    if(JSON.stringify(jsonData.ubicacion) != '{}'){
      await Ubicacion.create(
        {
          familia: familia.id,
          longitud: jsonData.ubicacion.longitud,
          latitud: jsonData.ubicacion.latitud,
        },
        {transaction}
      );
    }

    for (const establecimientos of jsonData.establecimientos_publicos) {
      await EstablecimientosPublicos.create(
        {
          familia: familia.id,
          tipo: establecimientos.tipo,
        },
        { transaction }
      );
    }

    // Insertar la gestión ambiental
    const gestionAmbiental = await GestionAmbiental.create(
      jsonData.gestion_ambiental,
      { transaction }
    );

    // Insertar el censo
    const censo = await Censo.create(
      {
        familia: familia.id,
        comunidad: jsonData.comunidad,
        sector : jsonData.sector,
        gestion_ambiental: gestionAmbiental.id,
        registro: jsonData.usuario,
        fecha_registro: new Date(),
      },
      { transaction }
    );



    await transaction.commit();
    res.json({
      ok: true,
      msg: "Datos Guardados!!!",
    });
  } catch (error) {
    await transaction.rollback();
    console.error("Error al insertar los datos:", error);
    return res.status(400).json({
      ok: false,
      msg: "Error al insertar los datos",
    });
  }
};

const getInformacion = async (req, res = response) => {
  try {
    const abastecimiento_agua = await AbastecimientoAgua.findAll();
    const ambiente = await Ambiente.findAll();
    const comunidad = await Comunidad.findAll({
      include: [
        {
          model: Sector,
          as: 'Sector',
          required: true
        }
      ]
    });
    const disposicion_aguas_reciduale = await DisposicionAguasReciduales.findAll();
    const disposicion_desechos_solidos = await DisposicionDesechosSolidos.findAll();
    const disposicion_excretas = await DisposicionExcretas.findAll();
    const escolaridad = await Escolaridad.findAll();
    const pared = await Pared.findAll();
    const piso = await Piso.findAll();
    const techo = await Techo.findAll();
    const tenencia = await Tenencia.findAll();
    const tipo_cocina = await TipoCocina.findAll();
    const tipo_establecimiento = await TipoEstablecimiento.findAll();
    const tipo_mascota = await TipoMascota.findAll();
    const ubicacion_cocina = await UbicacionCocina.findAll();
    const estado_civil = await EstadoCivil.findAll();
    const religion = await Religion.findAll();
    const procedencia = await Procedencia.findAll();

    res.json({
      ok: true,
      abastecimiento_agua: abastecimiento_agua,
      ambiente: ambiente,
      comunidad: comunidad,
      disposicion_aguas_reciduale: disposicion_aguas_reciduale,
      disposicion_desechos_solidos: disposicion_desechos_solidos,
      disposicion_excretas: disposicion_excretas,
      escolaridad: escolaridad,
      pared: pared,
      piso: piso,
      techo: techo,
      tenencia: tenencia,
      tipo_cocina: tipo_cocina,
      tipo_establecimiento: tipo_establecimiento,
      tipo_mascota: tipo_mascota,
      ubicacion_cocina: ubicacion_cocina,
      estado_civil: estado_civil,
      religion: religion,
      procedencia: procedencia
    });
  } catch (error) {
    console.log(error);
    res.json({
      ok: true,
      msg: "Error no se pudo obtener la infomacion solicitada",
    });
  }
};

const sicronizarBoletas= async (req, res = response) => {
  

  const transaction = await sequelize.transaction();
  const jsonData = req.body;
  try {
    console.log(jsonData);
    for (const boleta of jsonData.boletas) {
      await sincronizar(boleta);
    }

    await transaction.commit();
    res.json({
      ok: true,
      msg: "Datos Guardados!!!",
    });
  } catch (error) {
    await transaction.rollback();
    console.error("Error al insertar los datos:", error);
    return res.status(400).json({
      ok: false,
      msg: "Error al insertar los datos",
    });
  }

  
}

const sincronizar = async(boleta) =>{
  const transaction = await sequelize.transaction();
  const jsonData = boleta;
  try {
    console.log(jsonData);

    const vivienda = await Vivienda.create(jsonData.vivienda, {
      transaction,
    });
  
    const  ocupacion = jsonData.jefe_familia.ocupacion == '' ? 'No aplica' : jsonData.jefe_familia.ocupacion;
    const sabe_leer = jsonData.jefe_familia.sabe_leer== '' ? 'No aplica' : jsonData.jefe_familia.sabe_leer;
  
    // Insertar la persona (jefe de familia)
    const jefeFamilia = await Persona.create(
      {
        nombre: jsonData.jefe_familia.nombre,
        sexo: jsonData.jefe_familia.sexo,
        fecha_nacimiento: jsonData.jefe_familia.fecha_nacimiento,
        ocupacion: ocupacion,
        sabe_leer: sabe_leer,
        escolaridad: jsonData.jefe_familia.escolaridad
      },
      {
        transaction
      }
    );
    
    //verificar si el jefe_Familia esta embarazada
    if(JSON.stringify(jsonData.jefe_familia.embarazada) != '{}'){
      await Embarazada.create(
        {
          persona: jefeFamilia.id,
          tiempo_gestacion: detalle.embarazada.tiempo_gestacion,
          lleva_control: jsonData.jefe_familia.embarazada.lleva_control,
          lugar_control: jsonData.jefe_familia.embarazada.lugar_control,
          telefono: jsonData.jefe_familia.embarazada.telefono,
        },
        { transaction }
      );
    }
    const jefeFamiliaId = jefeFamilia.id;
  
    await JefeFamilia.create(
      {
        persona: jefeFamilia.id,
        estado_civil: jsonData.detalle_jefe_familia.estado_civil,
        religion: jsonData.detalle_jefe_familia.religion,
        procedencia: jsonData.detalle_jefe_familia.procedencia
      },
      { 
        transaction 
      }
    );
  
    
  
    // Insertar la familia
  
    const familia = await Familia.create(
      {
        no_familia: jsonData.no_familia,
        comunidad: jsonData.comunidad,
        sector: jsonData.sector,
        vivienda: vivienda.id,
        jefe_familia: jefeFamiliaId,
      },
      { transaction }
    );
  
    //incertando al jefe de familia en los detalles de la familia
    await DetalleFamilia.create(
      {
        familia: familia.id,
        miembro: jefeFamilia.id,
      },
      { transaction }
    );
  
    // Insertar los detalles de la familia
    for (const detalle of jsonData.familia) {
      const  _ocupacion = detalle.ocupacion == '' ? 'No aplica' : detalle.ocupacion;
      const _sabe_leer = detalle.sabe_leer== '' ? 'No aplica' : detalle.sabe_leer;
      console.log(_ocupacion);
      console.log(_sabe_leer);
      const miembro = await Persona.create(
        {
          nombre: detalle.nombre,
          sexo: detalle.sexo,
          fecha_nacimiento: detalle.fecha_nacimiento,
          ocupacion: _ocupacion,
          sabe_leer: _sabe_leer,
          escolaridad: detalle.escolaridad
        },
        {
          transaction
        }
      );
      if(JSON.stringify(detalle.embarazada) != '{}'){
        console.log(detalle.embarazada);
        await Embarazada.create(
          {
            persona: miembro.id,
            tiempo_gestacion: detalle.embarazada.tiempo_gestacion,
            lleva_control: detalle.embarazada.lleva_control,
            lugar_control: detalle.embarazada.lugar_control,
            telefono: detalle.embarazada.telefono,
          },
          { transaction }
        );
      }
      await DetalleFamilia.create(
        {
          familia: familia.id,
          miembro: miembro.id,
        },
        { transaction }
      );
    }
  
    for (const mascota of jsonData.mascotas) {
  
      await Mascota.create(
        {
          familia: familia.id,
          tipo_mascota: mascota.tipo_mascota,
          ubicacion: mascota.ubicacion,
          cantidad: mascota.cantidad,
        },
        { transaction }
      );
  
    }
  
    for (const establecimientos of jsonData.establecimientos_publicos) {
      await EstablecimientosPublicos.create(
        {
          familia: familia.id,
          tipo: establecimientos.tipo,
        },
        { transaction }
      );
    }
  
    if(JSON.stringify(jsonData.ubicacion) != '{}'){
      await Ubicacion.create(
        {
          familia: familia.id,
          longitud: jsonData.ubicacion.longitud,
          latitud: jsonData.ubicacion.latitud,
        },
        {transaction}
      );
    }
    // Insertar la gestión ambiental
    const gestionAmbiental = await GestionAmbiental.create(
      jsonData.gestion_ambiental,
      { transaction }
    );
  
    // Insertar el censo
    const censo = await Censo.create(
      {
        familia: familia.id,
        comunidad: jsonData.comunidad,
        sector: jsonData.sector,
        gestion_ambiental: gestionAmbiental.id,
        registro: jsonData.usuario,
        fecha_registro: new Date(),
      },
      { transaction }
    );
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    console.error("Error al insertar los datos:", error);
  }
}

module.exports = {
  crear,
  getInformacion,
  sicronizarBoletas
};
