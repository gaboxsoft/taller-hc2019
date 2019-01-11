

<template lang="html">
  <div id="main" class="container">
    <h1>DATOS PARA INICIAR SESIÓN:</h1>
    <div class="container bg-info">
      <form action="registro">
        <br />
        <br />
        <label for="email">...........e-mail:</label>
        <input type="email" v-model="usuarioLogin.email" placeholder="Escribe tu email">
        <br />
        <br />
        <label for="contrasenia">Contraseña:</label>
        <input type="password" v-model="usuarioLogin.password" placeholder="Escribe tu contraseña">

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
      <h5 v-model="usuarioLogin">Usuario: {{usuarioLogin.email}}({{usuarioLogin.nombres+' '+usuarioLogin.paterno+' '+(usuarioLogin.materno||'')}}): {{usuarioLogin.rol}}</h5>
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

  export default {
    data() {
      return {
        usuarioLogin: {email:'', password:''},
        token:'',
        err: ''
      }
    },
    computed: {
      getToken() {
        return this.$store.state.token;
      },
      getUsuarioLogin() {
        return this.$store.state.usuarioLogin;
      },
      getUsuarioVacio() {
        return this.$store.state.usuarioVacio;
      }
    },
    created() {

    },
    methods: {
      loginAdmin() {
        this.usuarioLogin = { email: '', password: '' }
        this.usuarioLogin.email = "gabox@msn.com";
        this.usuarioLogin.password = "12345";
        this.login();
      },

      login() {
        if (this.usuarioLogin.email === '' || this.usuarioLogin.password === '') {
          this.$store.commit('setToken', '');
          this.token = '';
          return;
        }
        axios.post(urlLogin, {
          email: this.usuarioLogin.email,
          password: this.usuarioLogin.password
        })
          .then((response) => {
            
            this.$store.commit('setToken', response.data.token);
            this.$store.commit('setUsuarioLogin', response.data.usuario);

          console.log('pase....')        
            this.usuarioLogin = response.data.usuario;
            this.token = response.data.token;
            console.log('pase....')
          },
          (error) => {
            this.err = error.response.data.error;
          });
      },
      logout() {
        this.$store.commit('setToken', '');
        this.$store.commit('setUsuarioLogin', this.$store.state.usuarioVacio);
        this.token = '';
        this.usuarioLogin = this.$store.state.usuarioVacio;
        alert('Sesión cerrrada!');
      }
    }
  };
</script>
