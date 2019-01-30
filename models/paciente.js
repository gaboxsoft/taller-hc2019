const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

const generoValido = require('../models/generoValido');
//const situacionValida = require('../models/situacionValida');
// const Domicilio = require('../models/domicilio');
//const Sello = require('../models/sello');
//const HojaInicialExpediente = require('../models/hojaInicialExpediente');
//const NotaUrgencia = require('../models/notaUrgencias');
//const HojaEvolucion = require('../models/hojaEvolucion');

const situacionValida = require('./situacionValida');



// Schema de paciente

let pacienteSchema = new Schema({
  // Nombre de paciente

  folioCuenta: {
    type: Number,
    default: 0,
    unique:true
  },
  nombre: {
    type: String,
    minlength: 2,
    required: [true, 'El NOMBRE es necesario.']
  },
  genero: {
    type: String,
    enum: generoValido,
    maxlength: 1,
    required: [true, 'Se requiere especificar el género del paciente.']
  },
  fechaNacimiento: {
    type: Date,
    required: [true, 'La fecha de nacimiento del paciente es necesaria.']
  },
  //////////////////////////
  //// Domicilio
  calle: {
    type: String
    //required: [true, 'El nombre de la calle es necesiaria.']
  },
  numExterior: {
    type: String
    //required: [true, 'El número exterior es necesario.']
  },
  numInterior: {
    type: String
    //required: [false, 'El número interior es opcional.']
  },
  colonia: {
    type: String
    //required: [true, 'El nombre de la colonia es necesaria.']
  },
  municipio: {
    type: String
    //required: [true, 'El nombre del municipio es necesario.']
  },
  entidad: {
    type: String
    //required: [true, 'El nombre de la entidad es necesaria.']
  },
  pais: {
    type: String
  },
  CP: {
    type: String,
    maxlength: 5
    //required: [false, 'El nCódigo Postal es opcional.']
  },
  telefonos: {
    type: String
    //required: [true, 'Almenos un teléfono es necesiario.']
  },
  /////////////////////////

  /////////////////////////
  // Médico tratante

  ////medicoTratante: {
  ////  type: Schema.Types.ObjectId,
  ////  ref: 'Usuario'
  ////},

  tituloMT: { type: String },
  tituloAbrMT: { type: String },
  nombreMT: { type: String },
  cedulaMT: { type: String },
  institucionMT: { type: String },
  especialidadMT: { type: String },

  //////////////////////////

  //////////////////////////
  //// HojaInicialExpediente

  fechaIngreso: {
    type: Date,
    //required: [true, 'La fecha de ingreso es necesaria.'],
    default: () => { new Date().toLocaleString() }
  },
  alergias: {
    type: String
    //required: [true, 'El número exterior es necesario.']
  },
  diagnosticoIngreso: {
    type: String
    //required: [false, 'El número interior es opcional.']
  },
  otrosDiagnosticos: {
    type: String
    //required: [true, 'El nombre de la colonia es necesaria.']
  },

  //////////////////////////
  //// Nota de urgencias
  fecha1: {
    type: Date,
    //required: [true, 'La fecha de ingreso es necesaria.'],
    default: () => { new Date().toLocaleString() }
  },
  seguro: {type: String},
  diagnosticoEgreso: { type: String },
  ocupacion: { type: String },
  FC: { type: String },
  FR: { type: String },
  TA: { type: String },
  T: { type: String },
  peso1: { type: String },
  talla1: { type: String },
  antecedentesImportancia1: { type: String },
  resumenClinico1: { type: String },
  indicaciones1: { type: String },

/////////////////////////
// Historia Clínica
/////////////////////////
  edoCivil: { type: String },
  lugarOrigen: { type: String },
  antHeredoFam: { type: String },
  personalesPato: { type: String },
  personalesNoPato: { type: String },
  ago: { type: String },
  tensionMens: { type: String },
  ritmo: { type: String },
  inicioVidaSexual: { type: String },
  gestados: { type: String },
  partos: { type: String },
  abortos: { type: String },
  cesareas: { type: String },
  fechaUltimpoParto: { type: String },
  fechaUltimoAborto: { type: String },
  pesoProductos: { type: String },
  fechaUltimaRegla: { type: String },
  fechaUltimaCitoCervix: { type: String },
  circuncision: { type: String },
  proteccionMenstrual: { type: String },
  otrosHistoriaClinica: { type: String },
  padecimientoActual: { type: String },
  peso: { type: String },
  talla: { type: String },
  temperatura: { type: String },
  tensionArterial: { type: String },
  craneo: { type: String },
  cara: { type: String },
  fondoOcular: { type: String },
  cuello: { type: String },
  cardioPulmunar: { type: String },
  abdomen: { type: String },
  mamas: { type: String },
  tactoVaginal: { type: String },
  tactoRectal: { type: String },
  miembros: { type: String },
  ID: { type: String },
  TX: { type: String },
  LAB: { type: String },
  USG: { type: String },
  RX: { type: String },
/////////////////////////

////  //////////////////////////
////  // Notas de Urgencias
////  /////////////////////////
////  notasEvolucion: [{
////    type: Schema.Types.ObjectId,
////    ref: 'NotaUrgencias'
////  }],
/////////////////////////////
////  //////////////////////////
////  // Hoja de Evolución
////  /////////////////////////
////  hojaEvolucion: [{
////    type: Schema.Types.ObjectId,
////    ref: 'HojaEvolucion'
////  }],
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

pacienteSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único. ' })





module.exports = mongoose.model('Paciente', pacienteSchema);









// // Nombre de paciente
// nombres:
// paterno:
// materno: 
// genero: 
// fechaNacimiento: 
// //Domicilio
// calle:
// numExterior: 
// numInterior: 
// colonia: 
// municipio: 
// entidad: 
// CP: 
// telefonos: 
// pais:
