//const Usuario = require('../models/usuario');

const pdf = require('pdfkit');
const pdfTools = require('../pdfkit/gxPdf');
const path = require('path');
const fs = require('fs');
const moment = require('moment');
require('moment/locale/es');  // without this line it didn't work
moment.locale('es')

const hojaEvolucionPdf = (paciente, evoluciones) => {
  const hojaCartaPort = [612, 792];
  const hojaCartaLan = [792, 612];

  var doc = new pdf({
    size: 'letter',
    layout: 'portrait',
    //size: hojaCartaPort,
    margin: 0,
    info: {
      Title: 'Hoja de Evolución: msi-14 v1.0',
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
  
  console.log('paciente: ', paciente.nombre);
  console.log('evoluciones: ');
  if (evoluciones) {
    for (var v in evoluciones) {
      console.log(v);
    };
  }
  else {
    console.log('--NO HAY EVOLUCIÓN-');
  }

  let imgFormato = path.resolve(__dirname, '../../msiformatos/msi14.jpg');

  doc.image(imgFormato, {
    fit: [anchoHoja, altoHoja]
  });
  const vacio = '';

  let pathCfg = path.join(__dirname, './hojaEvolucionFields.cfg');
  
  let pages = JSON.parse(fs.readFileSync(pathCfg, 'utf-8').toString().replace(/\n|\r/g, "").trim());

  page = 1;
  linesByPage = 3;
  line = 0;
  col = 1.5;
  row = 8.2;
    evoluciones.forEach(function (e) {
      if (line==0) {
        // Escribe encabezados
        pages[0].forEach(function (field) {
          writeLine(doc, eval(field.name), field.row, field.col, field.align, field.fontSize, field.color);
        });
      };
      writeLine(doc, new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        , row, col, 'left', 8, 'black');
      writeLine(doc, e.descripcion, row, col + 3, 'left', 8, 'black');
      row += .5;
      line++;
      //// agrega otra hoja
      //if (line % linesByPage == 0) {
      //  doc.image(imgFormato, {
      //    fit: [anchoHoja, altoHoja]
      //  });
      //  line = 0;
      //}
    });
 

  
  
  // Stream contents to a file
  const fileName = 'MSI14-' + Date.now() + '.pdf';
  const filePath = path.join(__dirname, '../../public/pdfs/' + fileName);
 

  doc.pipe(fs.createWriteStream(filePath)).on('finish', function () {
    console.log('Archivo creado satisfactoriamente ....');
    //return filePath;
  });



  doc.end();
  return filePath;
  //var buffer = encoding.convert(data, "Latin_1") 
}


function writeLine(doc, text, row, col, align, fontSize, color, width) {
  const vacio = '';
  //console.log('---- ');
  //console.log('in writeLine-> text: [', text, '] typeOf', typeof (text));
  //console.log('in writeLine-> align: [', align, '] typeOf', typeof (align));
  //console.log('in writeLine-> fontSize: [', fontSize, '] typeOf', typeof (fontSize));
  //console.log('in writeLine-> color: [', color, '] typeOf', typeof (color));
  //console.log('in writeLine-> row: [', row, '] typeOf', typeof (row));
  //console.log('in writeLine-> col: [', col, '] typeOf', typeof (col));
  if (!col || !row) {
    doc.moveDown()
      .fillColor(color || 'black')
      .fontSize(fontSize || 10)
      .text(text || vacio, {
        align: align || 'left',
        //indent: 2,
        ellipsis: true
      });
  }
  else {
    doc.moveDown()
      .fillColor(color || 'black')
      .fontSize(fontSize || 10)
      .text(text || vacio, pdfTools.cmToPt(col || 1), pdfTools.cmToPt(row || 1), {
        align: align || 'left',
        //indent: 2,
        ellipsis: true
      });
  };
}

module.exports = hojaEvolucionPdf;
