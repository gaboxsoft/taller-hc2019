const Paciente = require('../models/paciente');

const express = require('express');
const app = express();

const _ = require('underscore');

let { verificaToken, verificaAdminRol } = require('../middleware/autenticacion');

app.get('/pacientes', verificaToken, function(req, res) {

    let limite = Number(req.query.limite || 0);
    let desde = Number(req.query.desde || 0);

    Paciente.find({ 'sello.situacion': { $eq: 1 } })
        .limit(limite)
        .skip(desde)
        .exec((err, pacientes) => {
            if (err) {
                return res.status(400).
                json({ ok: false, error: err });
            };
            Paciente.countDocuments({ 'sello.situacion': { $eq: 1 } }, (err, conteo) => {
                if (err) {
                    return res.status(400).
                    json({ ok: false, error: err });
                }
                res.json({ ok: true, conteo: conteo, pacientes });
            });
        });
});

//app.get('/paciente/:id', verificaToken, function (req, res) {
  app.get('/paciente/:id',  function (req, res) {
    const id = req.params.id;
    let token = req.get('token');
    console.log('En /paciente/', id, ' con token:', token);
    Paciente.findById(id, (err, pacienteBD) => {
        if (err) {
            return res.status(400).
            json({ ok: false, error: err, msg: 'Y esta esta chingadera....s' });
        };
        return res.json({ ok: true, paciente: pacienteBD });
    });
});

app.post('/paciente', [verificaToken, verificaAdminRol], function(req, res) {

    let body = req.body;
    let paciente = new Paciente({
        nombre: body.nombre,
        genero: body.genero,
        fechaNacimiento: new Date(body.fechaNacimiento),
        domicilio: {
            calle: body.calle,
            numeroInterior: body.numeroInterior,
            numeroExterior: body.numeroExterior,
            colonia: body.colonia,
            municipio: body.municipio,
            entidad: body.entidad,
            pais: body.pais,
            cp: body.cp,
            telefonos: body.telefonos
        },
        sello: {
            fechaCreacion: new Date().toLocaleString(),
            fechaModificacion: new Date().toLocaleString(),
            situacion: 1, //1-activo
            //fechaBorrado: default nada
            usuario: req.usuario._id
        }

    });

    paciente.save((err, pacienteBD) => {
        if (err) {
            res.status(400).json({ ok: false, error: err, body: body });
        } else {
            res.json({ pacienteBD: pacienteBD });
        }
    });
});

app.put('/HojaInicialExpediente/:id', [verificaToken, verificaAdminRol], function(req, res) {
  /*
  fechaIngreso:
  medicoTratante:
  alergias: 
  diagnosticoIngreso: 
  otrosDiagnosticos:

*/
  let body = _.pick(req.body, ['fechaIngreso',
    'nombre', 'titulo', 'cedula', 'institucion', 'especialidad','alergias',
    'diagnosticoIngreso', 'otrosDiagnosticos'
    ]);

    console.log('body: ', body);
    console.log('paciente._id: ', req.params.id);

    let id = req.params.id;
    body.usuario = req.usuario._id;
    body.fechaModificacion = Date.now();
  /*
  fechaIngreso:
  medicoTratante:{ 
    titulo: ,
    nombre: ,
    cedula: ,
    institucion: ,
    especialidad: 
  },
  alergias: ,
  diagnosticoIngreso:,
  otrosDiagnosticos: 
*/
  body = {
    hojaInicialExpediente: {
      fechaIngreso: body.fechaIngreso,
      medicoTratante: {
        titulo: body.titulo,
        nombre: body.nombre,
        cedula: body.cedula,
        institucion: body.institucion,
        especialidad: body.especialidad
      },
      alergias: body.alergias,
      diagnosticoIngreso: body.diagnosticoIngreso,
      otrosDiagnosticos: body.otrosDiagnosticos,
    },
    sello: {
      fechaModificacion: new Date().toLocaleString(),
      usuario: req.usuario._id
    }
  };

    console.log('body para modificar:', body);


    Paciente.findOneAndUpdate({ _id: id, 'sello.situacion': { $eq: 1 } }, body, { new: true, runValidators: true, context: 'query' }, (err, pacienteBD) => {
        if (err) {
            return res.status(400).
            json({ ok: false, error: { mensaje: err } });
        }
        if (!pacienteBD) {
            return res.status(401).
            json({ ok: false, error: { mensaje: 'No existe paciente.' } });
        }
        res.json({ ok: true, pacienteBD: pacienteBD });
    })

});

app.delete('/paciente/:id', [verificaToken, verificaAdminRol], function(req, res) {

    let id = req.params.id;

    let modificarEstado = { 'sello.situacion': 0 /* borrado*/ , 'sello.fechaBorrado': new Date().toLocaleString() };

    Paciente.findByIdAndUpdate(id, modificarEstado, { new: true }, (err, personaBorrado) => {
        if (err) {
            return res.status(400).json({ ok: false, error: { mensaje: err } });
        };
        if (!personaBorrado) {
            return res.status(401).
            json({ ok: false, error: { mensaje: 'No existe paciente.' } });
        };
        res.json({ ok: true, personaBorrado });
    });

});


module.exports = app;
