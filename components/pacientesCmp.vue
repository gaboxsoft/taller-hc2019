
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
              v-for="p in pacientes">
            <td>{{p.folioCuenta}}</td>
            <td style="width:200px;">{{p.nombre}}</td>
            <td>{{p.genero}}</td>
            <td>{{p.diagnosticoIngreso}}</td>
            <td>{{p.telefonos}}</td>
            <td style="width:25px;">
              <b-btn btn-xs
                     v-on:click="seleccionar(p._id)">
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
    <!--<b-btn class="bg-success"
           v-on:click="addPaciente">AGREGAR PACIENTE</b-btn>-->
    <!--<updatePacienteCmp/>-->

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
      tituloPagina: 'P a c i e n t e',
      token: '',
      pacientes: {},
     
    }
  },
  computed: {
    getToken() {
      return this.$store.state.token;
    },
    urlApiPaciente () {
      return 'http://localhost:3000/paciente/' + this.$store.state.pacienteId;
    }
  },
    created() {
      //console.log('AQUÍ EN PACIENTES_CMP');
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
      //console.log('aquí en seleccionar paciente, id: ', pacienteId);
      this.$store.commit('setPacienteId', pacienteId)
      //this.$router.push({ name: 'index' })
      //this.$router.push({ name: 'hojaInicialExpediente' })
      //this.$forceUpdate();
      //this.getPacientes();
    },
    updatePaciente: (pacienteId) => {
      this.seleccionar(pacienteId);
      this.getCurrentPaciente(this.getToken);
      return true;

    },
    getCurrentPaciente: function (token) {
      //console.log('Aquí en pacienteCmp-->getCurrentPaciente: ', this.getPacienteId);

      axios.get(this.urlApiPaciente, {
        token: token
      })
        .then((response) => {
          this.paciente = response.data.paciente;
          //console.log('Leí currentPaciente en pacientesCmp: ', response.data.paciente);
          //this.$store.commit('setCurrentPaciente', this.paciente);
        },
        (error) => {
          //console.log('Leí paciente en historia clinica --ERROR--: ', error);          
            this.err = error.response.data.error;
            this.$store.commit('setPacienteId', undefined);
          });
    },

    getPacientes: function () {
     //console.log('AQUÍ EN pacientesCmp getPacientes()');
      this.token = this.$store.state.token;
      axios.get(urlGetPacientes, {
        headers: {
          'token': this.token
        }
      }).then((response) => {
        this.pacientes = response.data.pacientes;
        //console.log('en GetPacientes()--> listando pacientes', this.pacientes);
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
