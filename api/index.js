// INDEX.JS
const express = require('express')
const app = express();
const axios = require('axios');
console.log('directorio rsaiz...............: ', __dirname);
  app.get('/names', (req, res) => {

      //res.send('API root-- working.........')
      // res.status(200).json({ ok: true, data: { nombre: 'aa', edad: 'ba', sexo: 'ca', domiclio: 'da', sueldo: 12500.75 } });

      /////////////////
      let userLogin = '';
      let usersGet = '';
      let urlUsers = '/usuarios?limite=5&desde=0';
      let urlLogin = '/login';
      axios.post(urlLogin, {
              email: 'gabox@msn.com',
              password: '12345'
          })
          .then(response => {
              userLogin = response.data;
              //console.log('composición POST LOGIN======>>> ', post);
              console.log('composición RES LOGIN=======>>> ', userLogin);
              axios.get(urlUsers, {
                  headers: {
                      'token': userLogin.token
                  }
              }).then((response) => {
                  usersGet = response.data;
                  console.log('userGet:', usersGet);
                  return res.status(200).json({ ok: true, data: usersGet });
              }).catch(err => {
                  console.log('error en getUsuarios: ' + err);
                  return res.status(400).json({ ok: false, mensaje: 'error en getUsuarios: ' + err });
              });

          }).catch(err => {
              console.log('error en Login: ', err)
              return res.status(400).json({ ok: false, mensaje: 'error en login: ' + err });
          });
  });

//////////////////
// export the server middleware
/////////////////
module.exports = {
    path: '/api',
    handler: app
}
