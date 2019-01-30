var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var hojaEvolucionSchema = new Schema({

  fecha: {
    type: Date,
    //required: [true, 'La fecha de ingreso es necesaria.'],
    default: () => { new Date().toLocaleString() }
  },
  evolucion: {
    type: String
  }
});

module.exports = mongoose.model('HojaEvolucion', hojaEvolucionSchema);
