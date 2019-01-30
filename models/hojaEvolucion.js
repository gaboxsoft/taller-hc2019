var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const edoCivilValido = require('./EdoCivilValido');

var notaUrgenciaSchema = new Schema({

  fechaNota: {
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
  fc: {
    type: String
  },
  fr: {
    type: String
  },
  ta: {
    type: String
  },
  t: {
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
  }
  
});

module.exports = mongoose.model('NotaUrgencia', notaUrgenciaSchema);
