const Paciente = require('../models/paciente');

const express = require('express');
const app = express();

const _ = require('underscore');

let { verificaToken, verificaAdminRol } = require('../middleware/autenticacion');

app.get('/pacientes', verificaToken, function(req, res) {

    let limite = Number(req.query.limite || 0);
    let desde = Number(req.query.desde || 0);

    Paciente.find({ 'situacionSe': { $eq: 1 } })
        .limit(limite)
        .skip(desde)
        .exec((err, pacientes) => {
            if (err) {
                return res.status(400).
                json({ ok: false, error: err });
            };
            Paciente.countDocuments({ 'situacionSe': { $eq: 1 } }, (err, conteo) => {
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
    //console.log('En /paciente/', id, ' con token:', token);
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
    calle: body.calle,
    numeroInterior: body.numeroInterior,
    numeroExterior: body.numeroExterior,
    colonia: body.colonia,
    municipio: body.municipio,
    entidad: body.entidad,
    pais: body.pais,
    cp: body.cp,
    telefonos: body.telefonos,

    fechaIngreso: new Date().toLocaleDateString(),
    alergias: '',
    diagnosticoIngreso: '',
    otrosDiagnosticos: '',
    tituloMT: '',
    tituloAbrMT: '',
    nombreMT: '',
    cedulaMT: '',
    institucionMT: '',
    especialidadMT: '',
    fechaCreacionSe: new Date(),
    fechaModificacionSe: new Date(),
    situacionSe: 1, //1-activo
    //fechaBorrado: default nada
    usuarioSe: req.usuario._id
  });

    paciente.save((err, pacienteBD) => {
        if (err) {
            res.status(400).json({ ok: false, error: err, body: paciente });
        } else {
            res.json({ pacienteBD: pacienteBD });
        }
    });
});

app.put('/paciente/:id', [verificaToken, verificaAdminRol], function(req, res) {

  let body = _.pick(req.body, [
    'nombre','fechaNacimiento', 'genero',
    'calle', 'numInterior', 'numExterior', 'municipio',
    'entidad', 'pais', 'cp', 'telefonos'
    ]);

    //console.log('body: ', body);
    //console.log('paciente._id: ', req.params.id);

    let id = req.params.id;
    body.usuario = req.usuario._id;
    body.fechaModificacion = Date.now();
  //fechaNacimiento: new Date(body.fechaNacimiento),
  
    //console.log('body para modificar:', body);


    Paciente.findOneAndUpdate({ _id: id, 'situacionSe': { $eq: 1 } }, body, { new: true, runValidators: true, context: 'query' }, (err, pacienteBD) => {
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

    let modificarEstado = { 'situacionSe': 0 /* borrado*/ , 'fechaBorradoSe': new Date().toLocaleString() };

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
