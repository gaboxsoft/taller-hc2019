var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const situacionValida = require('./situacionValida');

var notaUrgenciasSchema = new Schema({

  fechaNota: {
    type: Date,
    //required: [true, 'La fecha de ingreso es necesaria.'],
    default: () => { new Date().toLocaleString() }
  },
  //lugarNacimiento: {
  //  type: String
  //},
  //ocupacion: {
  //  type: String
  //},
  //estadoCivil: {
  //  type: String,
  //  enum: edoCivilValido
  //},
  seguro: {
    type: String
  },
  diagnosticoEgreso: {
    type: String
  },
  FC: {
    type: String
  },
  FR: {
    type: String
  },
  TA: {
    type: String
  },
  T: {
    type: String
  },
  peso: {
    type: String
  },
  talla: {
    type: String
  },
  antecedentes: {
    type: String
  },
  resumenClinico: {
    type: String
  },
  indicaciones: {
    type: String
  },

  paciente: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  },

  //situacionSe: {
  //  type: Number,
  //  default:1
  //},

  /////////////////////////
// Sello
  fechaCreacionSe: {
    type: Date,
    required: [true, 'La fecha de creación es necesaria.'],
    default: () => { new Date().toLocaleString() }
  },
  fechaModificacionSe: {
    type: Date
  },
  situacionSe: {
    type: Number,
    required: [true, 'La situación deldocumento es necesaria.'],
    enum: situacionValida,
    default: 1 // 0-borrardo,  1-activo
  },
  fechaBorradoSe: {
    type: Date
  },
  usuarioSe: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  }
/////////////////////////

});

module.exports = mongoose.model('NotaUrgencias', notaUrgenciasSchema);
