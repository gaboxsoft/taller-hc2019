

<template lang="html">
  <div id="main" class="container">
    <h1>DATOS PARA INICIAR SESIÓN:</h1>
    <div class="container bg-info">
      <form action="registro">
        <br />
        <br />
        <label for="email">...........e-mail:</label>
        <input type="email" v-model="userLogin.email" placeholder="Escribe tu email">
        <br />
        <br />
        <label for="contrasenia">Contraseña:</label>
        <input type="password" v-model="userLogin.password" placeholder="Escribe tu contraseña">

        <!--<input type="password" id="password" class="form-control" />-->
        <br><br>
        <b-btn v-on:click="login">ABRIR SESIÓN</b-btn>
        <b-btn v-on:click="loginAdmin">ABRIR SESIÓN DE PRUEBA</b-btn>
        <!--<button type="button" class="btn btn-primary" v-on:click="login">Registrarse</button>-->
        <!--<input type="submit" class="btn col-12 btn-warning " v-on:click="login" value="Abrir Sesión">-->
        <br>
        <br>

      </form>
    </div>
    <div>
      <br />
      <h5 v-model="userLogin">Usuario: {{userLogin.email}}({{userLogin.nombres+' '+userLogin.paterno+' '+(userLogin.materno||'')}}): {{userLogin.rol}}</h5>
      <h5 v-model="token">  Token: {{token}}</h5>
      <br />
      <h5 class="text-warning bg-info">{{err}}</h5>
    </div>
    <b-btn v-on:click="logout">CERRAR SESIÓN</b-btn>
  </div>
</template>

<script>
  import axios from 'axios';
  var urlLogin = '/login';
  let userVacio= {nombres: '', paterno: '', materno: '', email: '', password: '' };
  export default {
    data() {
      return {
        userLogin: userVacio,
        token: '',
        err: ''
      }
    },

    methods: {
      
      loginAdmin() {
        this.userLogin.email = "gabox@msn.com";
        this.userLogin.password = "12345";

        this.login();
      },

      login() {

        this.err = '';
        if (this.userLogin.email === '' || this.userLogin.password === '') {
          alert('Escribe completos el email y contraseña para continuar.');
          this.token = '';
          sessionStorage.setItem('token', '');
          sessionStorage.setItem('usuario', userVacio);
          return;
        }
        axios.post(urlLogin, {
          email: this.userLogin.email,
          password: this.userLogin.password
        })
          .then((response) => {

          this.userLogin = response.data.usuario;
          this.token = response.data.token;
          sessionStorage.setItem('token', this.token);
          sessionStorage.setItem('usuario', this.userLogin);
          }
          , (error) => {
            sessionStorage.setItem('token', '');
            sessionStorage.setItem('usuario', userVacio);      
            this.err = error.response.data.error;
          });       
      },
      logout() {        
        this.token = '';
        this.userLogin = userVacio;
        sessionStorage.setItem('token', '');
        sessionStorage.setItem('usuario', userVacio);
        alert('Sesión cerrrada!');
      }
    }
  };
</script>
