
<template>
  <div class="main-container ">

    <h1 class=" text-primary">{{tituloPagina}}</h1>

    <notifyCmp ref="notify"/>

    <b-btn class="bg-success" v-on:click="guardar">GUARDAR</b-btn>
    <b-btn class="bg-success" v-on:click="imprimir">IMPRIMIR</b-btn>

    <br />
    <br />
    <form action="#">
      <div class="row">
        <div class="col-md-10">
          <div class="row">
            <div class="col-md-3 text-right">fecha-hora:</div>
            <div class="col-md-7 text-left"><input type="text" v-model="paciente.fecha1" name="fecha1"></div>
          </div>

          <div class="row">
            <div class="col-md-3  text-right">Ocupacion:</div>
            <div class="col-md-7  text-left"><input type="text" v-model="paciente.ocupacion" name="ocupacion"></div>
          </div>

          <div class="row">
            <div class="col-md-3  text-right">Seguro:</div>
            <div class="col-md-7  text-left"><input type="text" v-model="paciente.seguro" name="seguro"></div>
          </div>


          <div class="row">
            <div class="col-md-3  text-right">Diagnóstico egreso:</div>
            <div class="col-md-7  text-left"><input type="text" v-model="paciente.diagnosticoEgreso" name="diagnosticoEgreso"></div>
          </div>

          <div class="row">
            <div class="col-md-3  text-right">FC:</div>
            <div class="col-md-7  text-left"><input type="text" v-model="paciente.FC" name="FC"></div>
          </div>

          <div class="row">
            <div class="col-md-3  text-right">FR:</div>
            <div class="col-md-7  text-left"><input type="text" v-model="paciente.FR" name="FR"></div>
          </div>

          <div class="row">
            <div class="col-md-3  text-right">TA:</div>
            <div class="col-md-7  text-left"><input type="text" v-model="paciente.TA" name="TA"></div>
          </div>

          <div class="row">
            <div class="col-md-3  text-right">T:</div>
            <div class="col-md-7  text-left"><input type="text" v-model="paciente.T" name="T"></div>
          </div>

          <div class="row">
            <div class="col-md-3  text-right">Peso:</div>
            <div class="col-md-7  text-left"><input type="text" v-model="paciente.peso1" name="peso1"></div>
          </div>

          <div class="row">
            <div class="col-md-3  text-right">Talla:</div>
            <div class="col-md-7  text-left"><input type="text" v-model="paciente.talla1" name="talla1"></div>
          </div>

          <div class="row">
            <div class="col-md-3  text-right">Antecedentes importantes:</div>
            <div class="col-md-7  text-left"><input type="text" v-model="paciente.antecedentesImportancia1" name="antecedentesImportancia1"></div>
          </div>

          <div class="row">
            <div class="col-md-3  text-right">Resumen clínico:</div>
            <div class="col-md-7  text-left"><input type="text" v-model="paciente.resumenClinico1" name="resumenClinico1"></div>
          </div>

          <div class="row">
            <div class="col-md-3  text-right">Indicaciones:</div>
            <div class="col-md-7  text-left"><input type="text" v-model="paciente.indicaciones1" name="indicaciones1"></div>
          </div>

        </div>
      </div>

    </form>
    <b-btn class="bg-success" v-on:click="guardar">GUARDAR</b-btn>
    <b-btn class="bg-success" v-on:click="imprimir">IMPRIMIR</b-btn>

  </div>
</template>

<script>
  import axios from 'axios';
  import notifyCmp from '~/components/notifyCmp';
  const moment = require('moment');
  require('moment/locale/es');  // without this line it didn't work
  moment.locale('es')
  export default {
    name: 'notaUrgenciasCmp',
    components: {
      notifyCmp
    },
    data() {
      return {
        tituloPagina: 'NOTA URGENCIAS',
        /////////////////////////
        // nota de Urgencias
        /////////////////////////
        paciente: {
          fecha1: () => { new Date().toLocaleString() },
          seguro: '',
          diagnosticoEgreso: '',
          ocupacion:'',
          FC: '',
          TR: '',
          TA: '',
          T: '',
          peso1: '',
          talla1: '',
          antecedentesImportancia1: '',
          resumenClinico1: '',
          indicaciones1:''
        }
      }
    },

    computed: {
      urlGetPaciente: function () {
        return 'http://localhost:3000/paciente/' + this.$store.state.pacienteId;
      },
      urlNotaUrgencias: function () {
        return 'http://localhost:3000/NotaUrgencias/' + this.$store.state.pacienteId;
      },
      urlNotaUrgenciasPdf: function () {
        return 'http://localhost:3000/msi12/' + this.$store.state.pacienteId;
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
      this.getCurrentPaciente(this.getToken);
      console.log('EN nota urgencias.Created, Paciente= ', this.Paciente);
    },

    methods: {

      getCurrentPaciente: function (token) {

        axios.get(this.urlGetPaciente, {
          token: token
        })
          .then((response) => {
            this.paciente = response.data.paciente;
            console.log('response.data en nota urgencias: ', response.data);
            console.log('paciente en nota urgencias: ',this.paciente);
            //this.$store.commit('setCurrentPaciente', this.paciente);
          },
            (error) => {
              this.err = error.response.data.error;
              this.$store.commit('setCurrentPaciente', undefined);
            });
      },
      guardar: function () {
        console.log('1 En guardar NU-- url---->>>  ', this.urlHistoriaClinica);
        this.token = this.getToken;
        console.log('2 En guardar NU-- token---->>>  ', this.token);
        const req = {
          method: 'put',
          url: this.urlNotaUrgencias,
          headers: {
            token: this.token
          },
          data: {
            fecha1: this.paciente.fecha1,
            diagnosticoEgreso: this.paciente.diagnosticoEgreso,
            seguro: this.paciente.seguro,
            ocupacion: this.paciente.ocupacion,
            FC: this.paciente.FC,
            FR: this.paciente.FR,
            TA: this.paciente.TA,
            T: this.paciente.T,
            peso1: this.paciente.peso1,
            talla1: this.paciente.talla1,
            antecedentesImportancia1: this.paciente.antecedentesImportancia1,
              resumenClinico1: this.paciente.resumenClinico1,
            indicaciones1: this.paciente.indicaciones1
          }
        };
        axios(req)
          .then((response) => {
            console.log('En guardar NU-- success---->>> pasé ', response.data);
            this.$refs.notify.showNotify("DOCUMENTO GUARDADO", .5);

          })
          .catch(err => {
            console.log('ERROR  al guardar NU-- fail---->>> ', err.response);
            this.$refs.notify.showNotify("ERROR AL GUARDAR "+err, 5);
          });
      },
      imprimir: function () {

        console.log('aquí en imprimir NU...', this.urlNotaUrgenciasPdf);
       
        axios.get(this.urlNotaUrgenciasPdf, {
          headers: {
            token: this.getToken,
            Accept: 'application/pdf',
            responseType: 'blob'
          }
        })
          .then((response) => {
            console.log('aaquí en imprimir NU axios y regresó: ', response);
            console.log('aaquí en imprimir NU axios y regresó: ', response.data.pdfFile);
            this.$refs.notify.showNotify("CLICK AQUÍ PARA VER EL FORMATO", 4, response.data.pdfFile,true);
          },
            (error) => {
              this.err = error.response.data.error;
              console.log('Error en imprimir Nota Urgencias: ', this.err);
              this.$refs.notify.showNotify("ERROR AL GENERAR EL FORMATO", 5);
            });
      }
    }
  };

</script>

<style>
  .main-container {
    /*min-height: 100vh;*/
    /*display: flex;*/
    /*justify-content: center;*/
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
