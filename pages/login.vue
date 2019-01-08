

<template lang="html">
  <div id="main" class="container">
    <h1>Ingresa los datos para el registro:</h1>
    <div class="container bg-info">
      <form action="registro" >
        <br />
        <br />
        <label for="email">e-mail:</label>
        <input type="text" v-model="email" placeholder="Escribe tu email">
        <br />
        <br />
        <label for="contrasenia">Contraseña:</label>
        <input type="text" v-model="password" placeholder="Escribe tu contraseña">

        <!--<input type="password" id="password" class="form-control" />-->
        <br><br />
        <button type="button" class="btn btn-primary" v-on:click="login">Registrarse</button>
        <!--<input type="submit" class="btn col-12 btn-warning "  value="Envía">-->
        <br>
        <br />
      </form>
    </div>
    <div>
      <br />
      <h5>Usuario: {{userLogin.email}}: {{userLogin.nombres}}: {{userLogin.rol}}</h5>
      <h5>Token: {{token}}</h5>
      <br />
      <h5 class="text-warning bg-info">{{err}}</h5>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  var urlLogin = '/login';
 
  export default {
    data() {
      return {
        email: '',
        password: '',
        userLogin: '',
        token: '',
        err: ''
      }
    },

    methods: {

      login: function () {

        this.err = '';

        axios.post(urlLogin, {
          email: this.email,
          password: this.password
        })
          .then((response) => {

          this.userLogin = response.data.usuario;
          this.token = response.data.token;

          }
          , (error) => {
            this.userLogin = '';
            this.token = '';
              this.err = error.response.data.error;
      
          });
       
      }
    }
  };
</script>
