
<template>
  <div class="main-container">
   
    <h1 class=" text-primary">
      Lista de Pacientes ({{totalPacientes}})
    </h1>
    <div class="col-8">
      <no-ssr>
        <table class="table table-striped table-bordered table-hover table-info ">
          <tr>
            <td>ID</td>
            <td>NOMBRE</td>
            <td>GENERO</td>
            <td>TELÉFONOS</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr v-model="pacientes"
              v-for="paciente in pacientes">
            <td>{{paciente._id}}</td>
            <td style="width:200px;">{{paciente.nombre}}</td>
            <td>{{paciente.genero}}</td>
            <td>{{paciente.telefonos}}</td>
            <td>
              <b-btn btn-xs
                     v-on:click="seleccionar(paciente._id)">S</b-btn>
            </td>
            <td>
              <b-btn btn-xs
                     v-on:click="eliminar">
                <img src="../assets/iconos/boton-eliminar.png"
                     style="width: 25px;">
              </b-btn>
            </td>
            <td>
              <b-btn btn-xs
                     v-on:click="modificar">M</b-btn>
            </td>
            <td>
              <b-btn btn-xs
                     v-on:click="archiva">A</b-btn>
            </td>
          </tr>
        </table>
      </no-ssr>
    </div>
    <b-btn class="bg-success"
           v-on:click="addPaciente">AGREGAR PACIENTE</b-btn>

  </div>
</template>

<script>
const urlGetPacientes = 'http://localhost:3000/Pacientes?limite=0&desde=0';
const MAX_SIZE_NOMBRE = 50;
import axios from 'axios';
export default {
  name: 'pacientesCmp',
  
  data() {
    return {
      tituloPagina: 'P a c i e n t e s',
      totalPacientes: 0,
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
    this.getPacientes();
  },


  methods: {

    eliminar: function () {
      return true;
    }
    ,
    archiva: () => {
      return true;

    },
    modificar: () => {
      return true;

    },
    seleccionar: function (pacienteId) {
      console.log('aquí en seleccionar paciente, id: ', pacienteId);
      this.$store.commit('setPacienteId', pacienteId)
      this.$router.push({ name: 'index' })
      this.$forceUpdate();
    },
    addPaciente: () => {
      return true;

    },

    getPacientes: function () {
      //console.log(new Date(), '-->en pacientesCmp--> getPacientes--> this.$store.state.token:', this.$store.state.token);
      this.token = this.$store.state.token;
      axios.get(urlGetPacientes, {
        headers: {
          'token': this.token
        }
      }).then((response) => {
        this.pacientes = response.data.pacientes;
        this.totalPacientes = this.pacientes.length
        //console.log('En pacientesCmp-- success---->>> pasé ', new Date(), '--', this.pacientes.length);

      })
        .catch(err => {
          //console.log('---->>> error en Leer la lista de Pacientes:' + err);
          this.totalPacientes = this.pacientes.length
          this.pacientes = {};
          //console.log('En pacientesCmp-- fail---->>> pasé ', new Date(), '--', this.pacientes.length);
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
  padding: 90px;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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
