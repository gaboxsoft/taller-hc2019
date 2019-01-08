//const Usuario = require('../models/usuario');

const express = require('express');
const app = express();

let { verificaToken, verificaAdminRol } = require('../middleware/autenticacion');

const fs = require('fs');
const path = require('path');
const encoding = require('encoding');
const pdf = require('pdfkit');
const pdfTools = require('../library/pdfkit/gxPdf');

//app.get('/contrato', verificaToken, function(req, res) {
app.get('/contrato', function (req, res) {

  console.log('generando contrato..................');
  contratoPdf();

  ////rpt.save('CMSI-00-contrato.pdf');


  return res.status(200).json({ ok: true, data: 'todo bien....' });
});

module.exports = app;




function contratoPdf() {
  const hojaCartaPort = [612, 792];
  const hojaCartaLan = [792, 612];
  
  var doc = new pdf({
    size: 'letter',
    layout: 'portrait',
    //size: hojaCartaPort,
    margin: 0,
    info: {
      Title: 'Contrato de Prestación de Servicios: msi-00 v1.0',
      Author: 'Clínica Médica San Isidro',
    }
  });
  //doc.lineWidth(3);
  //doc.lineJoin('round')
  //  .rect(5, 5, 600, 750)
  //  .stroke();


  const anchoHoja = pdfTools.mmToPt(210.02); // ptos: 612;
  const altoHoja = pdfTools.mmToPt(297.01);  // Ptos: 792;
  const margenIzq = 10;
  const margenDer = 10;
  const maxAncho = anchoHoja - margenDer - margenIzq;
  const margenSup = 10;
  const margenInf = 10;
  const maxAlto = altoHoja - margenInf - margenSup;
  const sizePaperLetter = '210.02x297.01';
  const centroMedico = 'Médica San Isidro';
  const paciente = {
    nombre: 'JUANA DIAZ VELARDE',
    domicilio: 'LAGUNA DE SAN PABLO #24, COLONIA CIPRES, MUNICIPIO DE SAN JERÓNIMO ESTADO DE PUEBLA, MÉXICO',
    telefono: '7834571113',
    fechaNacimiento: Date.now()
  };
  const imgFormato = path.join(__dirname, '../msiFormatos/msi-00.jpg');
  console.log('imagen------------>>>> ', imgFormato);

  doc.image(imgFormato, {
    fit: [anchoHoja,altoHoja]
  });
  
  // Nombre
  doc.moveDown()
    .fillColor('black')
    .fontSize(12)
    .text(paciente.nombre, pdfTools.cmToPt(4.2), pdfTools.cmToPt(5.95), {
      align: 'left',
      indent: 2,
      height: 2,
      ellipsis: true
    });
  // Teléfono
  doc.moveDown()
    .fillColor('black')
    .fontSize(12)
    .text(paciente.telefono, pdfTools.cmToPt(3.5), pdfTools.cmToPt(6.425), {
      align: 'left',
      indent: 2,
      height: 2,
      ellipsis: true
    });

  //doc.moveDown()
  //  .fillColor('black')
  //  .fontSize(4)
  //  .text(encabezado, {
  //    align: 'justify'
  //  });
  //doc.moveDown()
  //  .fillColor('black')
  //  .fontSize(4)
  //  .text('CLAÚSULAS', {
  //    align: 'center',
  //    indent: 2,
  //    height: 2,
  //    ellipsis: true
  //  });


  //for (var i = 0; i < clausulas.length;  i++) {
  //  line = `${clausulas[i].numero}${clausulas[i].texto}`;
  //  doc.moveDown();
  //  doc.moveDown()
  //    .fillColor('black')
  //    .fontSize(4)
  //    .text(line, {
  //      align: 'justify'
  //    });
  //};
  doc.moveDown();
  doc.moveDown()
    .fillColor('black')
    .fontSize(12)
    .text('HelloäöüßÄÖÜ©µ®', {
      align: 'justify',
      indent: 2,
      height: 2,
      ellipsis: true
    });
  // Stream contents to a file
  doc.pipe(fs.createWriteStream('msi-00-Contrato'+ '.pdf')).on('finish', function () {
    console.log('Archivo creado satisfactoriamente ....');
  });

  doc.end();

  //var buffer = encoding.convert(data, "Latin_1") 
}


function convierteSVG2PDF() {
  var fs = require('fs');


  var doc = new pdf();
  stream = fs.createWriteStream('file.pdf');
  const pathSvgFile = path.normalize('C:/Users/Isecuriti/Desktop/node/MSI Formatos para digitalización/CMSI-00-Contrato-de-prestacion-servicios.svg');

  const svg = fs.readFileSync(pathSvgFile);

  SVGtoPDF(doc, svg, 0, 0);

  stream.on('finish', function () {
    console.log(fs.readFileSync('file.pdf'))
  });

  doc.pipe(stream);
  doc.end();

}











function ejemploPdf() {

  nombre = 'gabriel';
  apellidoPaterno = 'zuáres';
  apellidoMaterno = 'valdez';

  var doc = new pdf({
    //size: 'LETTER',
    layout: 'portrain',
    size: [210, 277],
    margin: 5,
    info: {
      Title: 'Contrato de Prestación de Servicios',
      Author: 'Clínica Médica San Isidro',
    }
  });

  // Write stuff into PDF
  doc.moveDown()
    .fillColor('black')
    .fontSize(4)
    .text('EJEMPLO DE DOCUMENTO PDF', {
      align: 'center',
      indent: 2,
      height: 2,
      ellipsis: true
    });


  doc.moveDown()
    .fillColor('black')
    .fontSize(4)
    .text('NOMBRE DE PERSONAS DESDE FORMULARIO', {
      align: 'center',
      indent: 2,
      height: 2,
      ellipsis: true
    });



  doc.moveDown()
    .fillColor('black')
    .fontSize(8)
    .text('NOMBRE: ' + nombre + ' ' + apellidoPaterno + ' ' + apellidoMaterno, {
      align: 'left',
      indent: 2,
      height: 2,
      ellipsis: true
    });

  // Stream contents to a file
  doc.pipe(fs.createWriteStream(nombre + "_" + apellidoPaterno + "_" + apellidoMaterno + '.pdf')).on('finish', function () {
    console.log('Archivo creado satisfactoriamente ....');
  });

  doc.end();

};
