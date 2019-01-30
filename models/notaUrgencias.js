var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const edoCivilValido = require('./EdoCivilValido');

var notaUrgenciasSchema = new Schema({

  fechaEmision: {
    type: Date,
    //required: [true, 'La fecha de ingreso es necesaria.'],
    default: () => { new Date().toLocaleString() }
  },
  lugarNacimiento: {
    type: String
  },
  ocupacion: {
    type: String
  },
  estadoCivil: {
    type: String,
    enum: edoCivilValido
  },
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
    type: Number
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
  }
});

module.exports = mongoose.model('NotaUrgencias', notaUrgenciasSchema);
