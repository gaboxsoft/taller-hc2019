
<template>
  <div id="main" class="main-container ">
    <h1 class=" text-primary">{{tituloPagina}}</h1>
    <notifyCmp ref="notify"/>
    
    <b-btn class="bg-success" v-on:click="guardarHojaInicialExpediente">GUARDAR</b-btn>
    <b-btn class="bg-success" v-on:click="imprimirHojaInicialExpediente">IMPRIMIR</b-btn>


    <br />
    <br />
    <form action="#">
      <!--<span>
      <label for="paciente.fechaIngreso">Fecha Ingreso:</label>
      <input type="date" :value="paciente.fechaIngreso.toISOString().split('.')[0]"
             @input="paciente.fechaIngreso = $event.target.valueAsDate">
      <input-date v-model="paciente.fechaIngreso"></input-date>
    </span>-->
      <span>
        <label for="paciente.fechaIngreso">Fecha ingreso:</label>

        <input type="datetime-local" v-model="paciente.fechaIngreso" />
      </span>

      <span>
        <b-btn class="bg-info" v-on:click="getFechaAhora">AHORA</b-btn>
      </span>

      <!--<p>
      <label for="paciente.nombre">nombre</label><br>
      <input type="text" v-model="paciente.nombre" name="nombre" />

    </p>-->
      <p>
        <label for="paciente.alergias">Alergias</label><br>
        <textarea v-model="paciente.alergias" name="alergias" rows="3" cols="80">
                </textarea>
      </p>
      <p>
        <label for="paciente.diagnosticoIngreso">Diagnóstico de ingreso:</label><br>
        <textarea v-model="paciente.diagnosticoIngreso" name="diagnosticoIngreso" rows="5" cols="80">
                </textarea>
      </p>
      <p>
        <label for="paciente.otrosDiagnosticos">Otros diagnósticos:</label><br>
        <textarea v-model="paciente.otrosDiagnosticos" name="otrosDiagnosticos" rows="5" cols="80">
                </textarea>
      </p>
    </form>
    <b-btn class="bg-success" v-on:click="guardarHojaInicialExpediente">GUARDAR</b-btn>
    <b-btn class="bg-success" v-on:click="imprimirHojaInicialExpediente">IMPRIMIR</b-btn>

  </div>
</template>

<script>
const urlGetPacientes = 'http://localhost:3000/Pacientes?limite=5&desde=0';
const MAX_SIZE_NOMBRE = 50;
  import axios from 'axios';
  import pacienteTagCmp from '~/components/pacienteTagCmp';
  import notifyCmp from '~/components/notifyCmp';

  const moment = require('moment');
  //require('moment/locale/es');  // without this line it didn't work
  //moment.locale('es')

  export default {
    name: 'hojaInicialExpedienteCmp',
    components: {
      pacienteTagCmp,
      notifyCmp
    },
    data() {
      return {
        tituloPagina: 'HOJA INICIAL DE EXPEDIENTE',
        token: '',
        paciente: { //hojaInicioExpediente
          fechaIngreso: moment().format('YYYY-MM-DDTHH:mm:ss'),//(new Date().toISOString()).split('.')[0],
            tituloMT: '',
          nombreMT: '',
          cedulaMT: '',
          institucionMT: '',
          especialidadMT: '',
          alergias: '',
          diagnosticoIngreso: '',
          otrosDiagnosticos: '',
        },
        reportePdf: ''
      }
    },

    computed: {
      url_Server: function () {
        return process.env.url_Server;
      },
      urlGetPaciente: function () {
        //console.log('url--->', this.$store.state.host + '/paciente/' + this.$store.state.pacienteId);
        //return this.$store.state.host + '/paciente/' + this.$store.state.pacienteId;
        return 'http://localhost:3000/paciente/' + this.$store.state.pacienteId;
      },
      urlHojaInicialExpediente: function () {
        //console.log('url--->', this.$store.state.host + '/paciente/' + this.$store.state.pacienteId);
        //return this.$store.state.host + '/paciente/' + this.$store.state.pacienteId;
        return 'http://localhost:3000/HojaInicialExpediente/' + this.$store.state.pacienteId;
      },
      urlHojaInicialExpedientePdf: function () {
        //console.log('url--->', this.$store.state.host + '/paciente/' + this.$store.state.pacienteId);
        //return this.$store.state.host + '/paciente/' + this.$store.state.pacienteId;
        return 'http://localhost:3000/msi10/' + this.$store.state.pacienteId;
      },
      getPaciente: function () {
        return this.$store.state.currentPaciente;
      },
      setPaciente: function () {
        this.$store.commit(this.currentPaciente);
      },
      getToken: function () {
        return this.$store.state.token;
      }
    },
    created() {
      console.log('url_Server: ', this.url_Server);
     
      console.log('fechaHora:', this.getFechaHora());

      this.getCurrentPaciente(this.getToken);
      //console.log('EN hojaIniExp.Created, currentPaciente= ', this.Paciente);
      
    },
    //ready() {
    //  alert('ready');
    //  //this.anObject.myDate = "2001-01-02T00:00:00"
    //},

    methods: {
      getFechaAhora: function () {
        this.fechaIngreso = this.getFechaHora();
      },

      getFechaHora: function () {
        axios.get('/fechaHora', {
          headers: {
            token: this.getToken
          }
        })
          .then((response) => {
            console.log('fechaHora servidor: ', response.data.fechaHora);
            return response.data.fechaHora;
          },
            (error) => {
              console.log('ERROR en fechaHora servidor ');
              this.err = error.response.data.error;
              return new Date();
            });
      },

      getCurrentPaciente: function (token) {

        //console.log('aquí en getCurrentPaciente y token:', token);
        console.log('aquí en getCurrentPaciente y url:', this.urlGetPaciente);

        axios.get(this.urlGetPaciente, {
          token: token
        })
          .then((response) => {
            //console.log('aaquí en getCurrentPaciente axios y regresó: ', response.data.paciente);
            this.paciente = response.data.paciente;
            console.log('fechaIngreso paciente de la BD: ', this.paciente.fechaIngreso);
            this.paciente.fechaIngreso = moment(this.paciente.fechaIngreso).format('YYYY-MM-DDTHH:mm:ss');
            console.log('fechaIngreso paciente de en moment(): ', this.paciente.fechaIngreso);

            //this.paciente.fechaIngreso = (new this.paciente.fechaIngreso.toISOString()).split('.')[0]
            //this.$store.commit('setCurrentPaciente', response.data.paciente);
          },
          (error) => {
            console.log('error en getCurrentPaciente(): ' + error);
              this.err = error.response.data.error;
             // this.$store.commit('setCurrentPaciente', undefined);
            });
      },
      guardarHojaInicialExpediente: function () {

        //console.log('1 En guardar hie-- url---->>>  ', this.urlHojaInicialExpediente);
        this.token = this.getToken;
        //console.log('2 En guardar hie-- token---->>>  ', this.token);
        const req = {
          method: 'put',
          url: this.urlHojaInicialExpediente,
          headers: {
            token: this.token
          },
          data: {
            fechaIngreso: this.paciente.fechaIngreso,
            tituloMT: this.paciente.tituloMT,
            nombreMT: this.paciente.nombreMT,
            cedulaMT: this.paciente.cedulaMT,
            institucionMT: this.paciente.institucionMT,
            especialidadMT: this.paciente.especialidadMT,
            alergias: this.paciente.alergias,
            diagnosticoIngreso: this.paciente.diagnosticoIngreso,
            otrosDiagnosticos: this.paciente.otrosDiagnosticos,
          }
        };
        axios(req)
          .then((response) => {
            //console.log('En guardar hie-- success---->>> pasé ', response.data);
            this.$refs.notify.showNotify("DOCUMENTO GUARDADO", 2.5);

          })
          .catch(err => {
            //console.log('ERROR  al guardar HIE-- fail---->>> pasé ', err.response);
            this.$refs.notify.showNotify("ERROR AL GUARDAR: "+err.response, 2.5);
          });
      },
      imprimirHojaInicialExpediente: function () {

        //console.log('aquí en imprimir HIE...', this.urlHojaInicialExpedientePdf);
        
        axios.get(this.urlHojaInicialExpedientePdf, {
          headers: {
            token: this.getToken,             
            Accept: 'application/pdf',
            responseType: 'blob'
          }
        })
          .then((response) => {
            //console.log('aaquí en imprimirHojaInicialExpediente axios y regresó: ', response.data.pdfFile);
            this.$refs.notify.showNotify("CLICK AQUÍ PARA VER EL FORMATO", 4,response.data.pdfFile, true);
          },
            (error) => {
              this.err = error.response.data.error;
              //console.log('Error en imprimirHojaInicialExpediente: ', this.err);
              this.$refs.notify.showNotify("ERROR AL GENERAR EL FORMATO: "+error, 5);
            });
      },     
      seleccionar: function (pacienteId) {
        //console.log('aquí en seleccionar paciente, id: ', pacienteId);
        this.$store.commit('setPacienteId', pacienteId)
        this.$router.push({ name: 'index' })
        this.$forceUpdate();
      },
      addPaciente: () => {
        return true;

      },

      getPacientes: function () {
        this.token = this.$store.state.token;
        axios.get(urlGetPacientes, {
          headers: {
            'token': this.token
          }
        }).then((response) => {
          this.pacientes = response.data.pacientes;
          this.totalPacientes = this.pacientes.length
          
        })
          .catch(err => {
            this.totalPacientes = this.pacientes.length
            this.pacientes = {};
          });
      }
    }
  };
  
</script>

<style>
.main-container {
  /*min-height: 100vh;*/
  /*display: flex;*/
  justify-content: center;
  /*align-items: center;
  text-align: center;*/
  padding-top: 90px;
}

/*.title {
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
}*/
</style>
