
<template >
  <div id="main" class="main-container">
    <h1>REGISTRATE PARA INICIAR SESIÓN</h1>
    <div class=" bg-info">
    <form action="registro">
      <no-ssr>
        <table>
          <tr>
            <td>
              <label for="email">e-mail:</label>
            </td>
            <td>
              <input type="email" v-model="usuarioLogin.email" placeholder="Escribe tu email">
            </td>
          </tr>
          <tr>
            <td>
              <label for="contrasenia">Contraseña:</label>
            </td>
            <td>
              <input type="password" suggested="current-password" v-model="usuarioLogin.password" placeholder="Escribe tu contraseña">
            </td>
          </tr>
          <tr>
            <td>
              <b-btn class="bg-success" v-on:click="login">ABRIR SESIÓN</b-btn>
            </td>
            <td>
              <b-btn class="bg-success" v-on:click="loginAdmin">ABRIR SESIÓN DE PRUEBA</b-btn>
            </td>
          </tr>
        </table>
      </no-ssr>
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
  const usuarioVacio = { email: '', password: '' };
  export default {
    name:'loginCmp',
    data() {
      return {
        usuarioLogin: usuarioVacio,
        token: '',
        err: ''
      }
    }
  ,
    computed: {
      Token: {
        get: () => {
          return this.$store.getters.getToken;
        },
        set: (payload) => {
          this.$store.commit('setToken', payload);
        }
      },
      Host: {
        get: () => {
          return this.$store.getters.getHost;
        }
      }
    },
    created() {
      console.log('1 aquí en created... token vale: ', this.$store.state.token);
    },
    methods: {
      loginAdmin() {

        console.log('aquí en loginAdmin')

        this.usuarioLogin = { email: '', password: '' }
        this.usuarioLogin.email = "gabox@msn.com";
        this.usuarioLogin.password = "12345";
        this.login();
      },

      login() {

        

        if (this.usuarioLogin.email === '' || this.usuarioLogin.password === '') {

          this.$store.commit('setToken', '>>--NONE--');
          //this.Token.set('');
          this.token = '';
          return;
        }
        axios.post(urlLogin, {
          email: this.usuarioLogin.email,
          password: this.usuarioLogin.password
        })
          .then((response) => {
            //this.Token.set('response.data.token');
            this.$store.commit('setToken', response.data.token);
            this.usuarioLogin = response.data.usuario;
            this.token = response.data.token;
            //console.log('pase....', this.Token.get)
            console.log('aquí en login... despues de guardar token, token vale: ', this.$store.state.token);

          },
          (error) => {
            this.err = error.response.data.error;
          });
      },
      logout() {
        this.$store.commit('setToken', 'NONE');
        //this.Token.set('');
        this.token = 'NONE';
        this.usuarioLogin = usuarioVacio;
        alert('Sesión cerrrada!');
      }
    }
  };
</script>


<style>

  html {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  .main-container {
    /*min-height: 100vh;*/
    /*display: flex;*/
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 55px;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
  }
  
  .button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;
  }

    .button--green:hover {
      color: #fff;
      background-color: #3b8070;
    }

  .button--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;
  }

    .button--grey:hover {
      color: #fff;
      background-color: #35495e;
    }
</style>
