const exceljs = require('exceljs');
const Embarazada = require('../models/embarazada');
const Persona = require('../models/persona');
const DetalleFamilia = require('../models/detalle_familia');
const Familia = require('../models/familia');

const excelGestacion = async(req,res) =>{
    if (!req.session.loggedin) {
        return res.redirect('/')
    }

    const noComunidad = req.query.comunidad;
    console.log("NO. comunidad: "+noComunidad);

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

    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Datos');

    worksheet.addRow(['No. Familia', 'Nombre', 'Tiempo gestacion', 'LLeva control', 'Lugar control','Telefono']);
    
    result.forEach(element => {
        worksheet.addRow(
            [
                element.PersonaE.detalle.detalleF.no_familia,
                element.PersonaE.nombre,
                element.tiempo_gestacion  ? element.tiempo_gestacion: '--',
                element.lleva_control ? element.lleva_control: '--',
                element.lugar_control ? element.lugar_control: '--',
                element.telefono ? element.telefono: '--',
            ],
        )
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=export.xlsx');


    await workbook.xlsx.write(res);
    res.end();
}

module.exports = {
    excelGestacion
}