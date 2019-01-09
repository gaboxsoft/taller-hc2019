/*
 * Configuraciones Públicas Globales
 */
///////////////////
// Servidor Host

process.env.HOST = process.env.HOST || 'http://127.0.0.1'

// puerto default del servidor
process.env.PORT = process.env.PORT || 3000;

//////////
// Entorno de ejecución
//////////

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/// DEtermina la base de datos de prueba o producción
if (process.env.NODE_ENV === 'development') {
    process.env.URLDB = 'mongodb://localhost:27017/cafe';
  process.env.HOST = 'http://127.0.0.1';
} else {
  process.env.HOST = 'https://hc2019.herokuapp.com';
    process.env.URLDB = process.env.MONGO_URI;
}


// seed
process.env.SEED = process.env.SEED || "este-es-el-seed-de-desarrollo";

// caducidad seed
process.env.CADUCIDAD = process.env.CADUCIDAD || 1000 * 60 * 60 * 24 * 30; //60segs*60mins*24horas*30dias
//process.env.CADUCIDAD = process.env.CADUCIDAD || 1000 * 5; //1000 milisegundos=1seg => 1hra = 1000*60segs*60mins

// Client_Id de google
process.env.CLIENT_ID = process.env.CLIENT_ID || '403607364933-cndqin88pdjlrpcuhrcb4djn38us80dd.apps.googleusercontent.com';

// Diferencia de la zona horaria central de México: UTC-6 
process.env.UTCmx = process.env.UTCmx || (1000 * 60 * 60 * 6);

/////////////////////////
//// Agrega las variables de sesion
require('./sesionApp');
