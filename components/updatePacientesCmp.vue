
<template>
  <div class="main-container">
    
    <div class="col-8">
      <no-ssr>
        <table class="table table-striped table-bordered table-hover table-info ">
          <tr>
            <td>FOLIO</td>
            <td>NOMBRE</td>
            <td>GENERO</td>
            <td>DIAGNOSTICO</td>
            <td>TELÉFONOS</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr v-model="pacientes"
              v-for="paciente in pacientes">
            <td>{{paciente.folioCuenta}}</td>
            <td style="width:200px;">{{paciente.nombre}}</td>
            <td>{{paciente.genero}}</td>
            <td>{{paciente.diagnosticoIngreso}}</td>
            <td>{{paciente.telefonos}}</td>
            <td style="width:25px;">
              <b-btn btn-xs
                     v-on:click="seleccionar(paciente._id)">
                <img src="../assets/iconos/boton-seleccionar-documento.png" style="width: 25px;">
              </b-btn>
            </td >
            <td>
              <b-btn btn-xs
                     v-on:click="eliminar">
                <img src="../assets/iconos/boton-eliminar.png" style="width: 25px;">
              </b-btn>
            </td>
            <td>
              <b-btn btn-xs
                     v-on:click="modificar">
                <img src="../assets/iconos/boton-modificar.png" style="width: 25px;">
              </b-btn>
            </td>
            <td>
              <b-btn btn-xs
                     v-on:click="archiva">
              <img src="../assets/iconos/boton-archivar.png" style="width: 25px;">
              </b-btn>
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
  name: 'updatePacientesCmp',
  
  data() {
    return {
      tituloPagina: 'P a c i e n t e',
      token: ''
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
    updatePaciente: (pacienteId) => {
      return true;

    },

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
