
<template>
  <div class="main-container">
    <h1 class=" text-primary">
      Lista de Pacientes ({{totalPacientes}})
    </h1>
    <div class="col-8">
      <table class="table table-striped table-bordered table-hover table-info ">
        <tr v-model="pacientes" v-for="paciente in pacientes">
          <td>{{paciente.nombres+' '+paciente.paterno+' '+(paciente.materno||'')}}</td>
          <td><b-btn btn-xs v-on:click="eliminar"><img src="../assets/iconos/boton-eliminar.png" style="width: 25px;"></b-btn></td>
          <td><b-btn btn-xs v-on:click="modificar">M</b-btn></td>
          <td><b-btn btn-xs v-on:click="archiva">A</b-btn></td>
          <td><b-btn btn-xs v-on:click="seleccionar">S</b-btn></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>

  const urlGetPacientes = 'http://localhost:3000/Pacientes?limite=5&desde=0';
  const MAX_SIZE_NOMBRE = 50;
  import axios from 'axios';
  export default {

    name: 'pacientesCmp',
    data() {
      return {
        tituloPagina:'P a c i e n t e s',
        totalPacientes : 0,
        pacientes: {},
        token: ''// 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7Im5vbWJyZXMiOiJBRE1JTiIsInBhdGVybm8iOiJBRE1JTiIsImNlZHVsYSI6IjAwMDAwIiwiaW5zdGl0dWNpb24iOiJuaW5ndW4iLCJlc3BlY2lhbGlkYWQiOiJuaW5ndW4iLCJyb2wiOiJBRE1JTl9ST0wiLCJfaWQiOiI1YzJiZDg4OWQyYTA5YTM4MjA1ZTljOGEiLCJlbWFpbCI6ImdhYm94QG1zbi5jb20iLCJfX3YiOjB9LCJpYXQiOjE1NDcyMjI4NzEsImV4cCI6MTU0OTgxNDg3MX0.2ECIxQrhReKb2vM0P3_axo7jg7thSNNG582-bBj-4mQ'
      }
    },
    computed: {
      getToken() {
        return this.$store.state.token;
      }
    },
    created() {
      console.log('1 this.$store.state=', this.$store.state)
      this.getPacientes();
    },


    methods: {

      eliminar: function() {
        return true;
      }
      ,
      archiva: () => {
        return true;

      },
      modificar: () => {
        return true;

      },
      seleccionar: () => {
        return true;

      },

      getPacientes: function () {
        console.log('pacientes=', this.pacientes, '(', this.totalPacientes, ')');
        console.log('2-this.$store.state.token=', this.$store.state.token)
        this.token = this.$store.state.token;
        console.log('3-this.token=', this.token)
        //console.log('4-this.$store.state.token=', this.$store.state.token)
        axios.get(urlGetPacientes, {
          headers: {
            'token': this.token //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7Im5vbWJyZXMiOiJBRE1JTiIsInBhdGVybm8iOiJBRE1JTiIsImNlZHVsYSI6IjAwMDAwIiwiaW5zdGl0dWNpb24iOiJuaW5ndW4iLCJlc3BlY2lhbGlkYWQiOiJuaW5ndW4iLCJyb2wiOiJBRE1JTl9ST0wiLCJfaWQiOiI1YzJiZDg4OWQyYTA5YTM4MjA1ZTljOGEiLCJlbWFpbCI6ImdhYm94QG1zbi5jb20iLCJfX3YiOjB9LCJpYXQiOjE1NDcyMjI4NzEsImV4cCI6MTU0OTgxNDg3MX0.2ECIxQrhReKb2vM0P3_axo7jg7thSNNG582-bBj-4mQ'
          }
        }).then((response) => {

          console.log('4-this.token=', this.token)
          var data = response.data;
          this.pacientes = response.data.pacientes;
          this.totalPacientes = this.pacientes.length
          })
          .catch(err => {
            console.log('pacientes=', this.pacientes, '(', this.totalPacientes, ')');

            console.log('5-this.token=', this.token)
            console.log('---->>> error en Leer la lista de Pacientes:' + err);
            this.pacientes = {};
          });
      }
    }
  }
</script>

<style>

  .main-container {
    /*min-height: 100vh;*/
    /*display: flex;*/
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 55px;
  }

  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
  }
</style>
