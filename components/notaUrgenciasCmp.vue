
<template>
  <div class="main-container ">
    <h1 class=" text-primary">{{tituloPagina}}</h1>
    <notifyCmp ref="notify" />
    <b-btn class="bg-success" v-on:click="guardar">GUARDAR</b-btn>
    <!--<b-btn class="bg-success" v-on:click="imprimir">IMPRIMIR</b-btn>-->
    <br />
    <br />
    <form action="#">
      <div class="row">
        <div class="col-md-10">
          <!--<div class="row">
            <div class="col-md-7 text-sm-left">{{notaUrgencias._id}}</div>
          </div>-->
          <div class="row">
            <div class="col-md-3 text-right">fecha-hora:</div>
            <div class="col-md-5 text-left"><input class="input-text" type="datetime-local" v-model="notaUrgencias.fechaNota" name="fechaNota"></div>
          </div>
          <div class="row">
            <div class="col-md-5  text-right">Ocupacion:</div>
            <!--            <div class="col-md-5  text-left"><input class="input-text" type="text" v-model="paciente.ocupacion" name="ocupacion"></div>-->
            <div class="col-md-4  text-left">{{paciente.ocupacion}}</div>
          </div>
          <div class="row">
            <div class="col-md-3  text-right">Seguro:</div>
            <div class="col-md-5  text-left"><input class="input-text" type="text" v-model="notaUrgencias.seguro" name="seguro"></div>
          </div>

          <div class="row">
            <div class="col-md-3  text-right">Diagnóstico egreso:</div>
            <div class="col-md-5  text-left"><input class="input-text" type="text" v-model="notaUrgencias.diagnosticoEgreso" name="diagnosticoEgreso"></div>
          </div>


          <div class="row">
            FC:
            <input class="input-text col-md-2" type="text" v-model="notaUrgencias.FC" name="FC">
            <!--<div class="col-md-3  text-right">FC:</div>
            <div class="col-md-5  text-left"><input class="input-text" type="text" v-model="notaUrgencias.FC" name="FC"></div>-->
            <!--</div>
            <div class="row">-->
            FR:
            <input class="input-text col-md-2" type="text" v-model="notaUrgencias.FR" name="FR">
            <!--<div class="col-md-3  text-right">FR:</div>
            <div class="col-md-5  text-left"><input class="input-text" type="text" v-model="notaUrgencias.FR" name="FR"></div>-->
          </div>
          <div class="row">
            <div class="col-md-3  text-right">TA:</div>
            <div class="col-md-5  text-left"><input class="input-text" type="text" v-model="notaUrgencias.TA" name="TA"></div>
          </div>
          <div class="row">
            <div class="col-md-3  text-right">T:</div>
            <div class="col-md-5  text-left"><input class="input-text" type="text" v-model="notaUrgencias.T" name="T"></div>
          </div>



          <div class="row">
            <div class="col-md-3  text-right">Peso:</div>
            <div class="col-md-5  text-left"><input class="input-text" type="text" v-model="notaUrgencias.peso" name="peso"></div>
          </div>
          <div class="row">
            <div class="col-md-3  text-right">Talla:</div>
            <div class="col-md-5  text-left"><input class="input-text" type="text" v-model="notaUrgencias.talla" name="talla"></div>
          </div>
          <div class="row">
            <div class="col-md-3  text-right">Antecedentes importantes:</div>
            <div class="col-md-5  text-left"><input class="input-text" type="text" v-model="notaUrgencias.antecedentesImportancia" name="antecedentesImportancia"></div>
          </div>
          <div class="row">
            <div class="col-md-3  text-right">Resumen clínico:</div>
            <div class="col-md-5  text-left"><textarea class="input-text" type="text" v-model="notaUrgencias.resumenClinico" name="resumenClinico" rows="5" cols="50"></textarea></div>
          </div>
          <div class="row">
            <div class="col-md-3  text-right">Indicaciones:</div>
            <div class="col-md-5  text-left">
              <textarea class="input-text" v-model="notaUrgencias.indicaciones" name="indicaciones" rows="5" cols="50"></textarea>
            </div>
          </div>
        </div>
      </div>
    </form>
    <b-btn class="bg-success" v-on:click="guardar">GUARDAR</b-btn>
    <!--<b-btn class="bg-success" v-on:click="imprimir">IMPRIMIR</b-btn>-->
  </div>
</template>
<script>
  import axios from 'axios';
  import notifyCmp from '~/components/notifyCmp';
  const moment = require('moment');
  //require('moment/locale/es');  // without this line it didn't work
  //moment.locale('es')
  export default {
    name: 'notaUrgenciasCmp',
    components: {
      notifyCmp
    },
    data() {
      return {
        tituloPagina: 'NOTA URGENCIAS',

        paciente: {},
        notaUrgencias: {},
        notaUrgenciasNuevo: {
          fechaNota: moment().format('YYYY-MM-DDTHH:mm'), //(new Date().toISOString()).split('.')[0],
          seguro: '',
          diagnosticoEgreso: '',
          FC: '',
          FR: '',
          TA: '',
          T: '',
          peso: '',
          talla: '',
          antecedentes: '',
          resumenClinico: '',
          indicaciones: ''
        }
      }
    },

    computed: {
      urlApiNotaUrgencias: function () {
        return 'http://localhost:3000/NotaUrgencias/';
      },
      urlGetPaciente: function () {
        return 'http://localhost:3000/paciente/' + this.$store.state.pacienteId;
      },
      urlGetNotaUrgencias: function () {
        return 'http://localhost:3000/NotaUrgencias/' + this.$store.notaUrgenciasId;
      },
      urlNotaUrgenciasPdf: function () {
        return 'http://localhost:3000/msi12/' + this.$store.state.pacienteId;
      },
      getNotaUrgenciasId: function () {
        return this.$store.state.notaUrgenciasId;
      },
      getToken: function () {
        return this.$store.state.token;
      }
    },
    watch: {
      getNotaUrgenciasId: function () {
        console.log('notasUrgenciasCmp->Watch->getNotaUrgenciasId->', this.getNotaUrgenciasId)

        this.getCurrentPaciente(this.getToken);
        if (!this.getNotaUrgenciasId || this.getNotaUrgenciasId === 'NUEVO' || this.getNotaUrgenciasId === 'NONE') {
          console.log('AGREGANDO NUEVA NOTA DE URGENCIAS...2');
          this.notaUrgencias = this.notaUrgenciasNuevo;
        }
        else {
          console.log('notasUrgenciasCmp->created()->getNotaUrgenciasId->', this.getNotaUrgenciasId)
          this.getNotaUrgencias();
        }

      }
    },
    created() {
      this.getCurrentPaciente(this.getToken);
      if (!this.getNotaUrgenciasId || this.getNotaUrgenciasId === 'NUEVO' || this.getNotaUrgenciasId === 'NONE') {
        console.log('AGREGANDO NUEVA NOTA DE URGENCIAS...1');
        this.$store.commit('setNotaUrgenciasId', 'NUEVO');
        this.notaUrgencias = this.notaUrgenciasNuevo;
      }
      else {
        console.log('notasUrgenciasCmp->created()->getNotaUrgenciasId->', this.getNotaUrgenciasId)
        this.getNotaUrgencias();
      }
      //console.log('EN nota urgencias.Created, Paciente= ', this.Paciente);
    },

    methods: {

      getNotaUrgencias: function () {



        console.log('--1.- en NotaUrgenciasCmp->urlNotaUrgencias->', this.urlGetNotaUrgencias);
        //console.log('--1.1.- en NotasUrgenciasCmp->Token->', this.getToken);
        //console.log('--1.2.- en NotasUrgenciasCmp->Token->', this.$store.state.pacienteId);
        console.log('--1.3.- en NotaUrgenciasCmp->urlNotaUrgencias->', this.urlApiNotaUrgencias + this.$store.state.notaUrgenciasId);
        console.log('--1.4.- en NotaUrgenciasCmp->notaUrgenciasId->', this.$store.state.notaUrgenciasId);
        //axios.get(this.urlGetNotasUrgencias, {
        axios.get(this.urlApiNotaUrgencias + this.$store.state.notaUrgenciasId, {
          //token: token
          headers: {
            token: this.getToken
          }
        })
          .then((response) => {
            console.log('ojo 22.-response.data en nota urgencias: ', response.data);
            this.notaUrgencias = response.data.notaUrgencias;
            this.notaUrgencias.fechaNota = moment(this.notaUrgencias.fechaNota).format('YYYY-MM-DDTHH:mm');

          },
            (error) => {
              this.err = error;
              console.log('23.-ERROR response.data en nota urgencias: ');
              this.$store.commit('setNotaUrgenciasId', undefined);
            });
      },

      getCurrentPaciente: function () {

        axios.get(this.urlGetPaciente, {
          token: this.getToken
        })
          .then((response) => {
            this.paciente = response.data.paciente;
            console.log('paciente en nota urgencias: ', this.paciente);

          },
            (error) => {
              this.err = error.response.data.error;
              this.$store.commit('setPacienteId', undefined);
            });
      },
      guardar: function () {

        console.log('1 En guardar NU-- url---->>>  ', this.urlApiNotaUrgencias + this.$store.state.pacienteId);
        this.token = this.getToken;
        this.notaUrgencias.fechaNota = this.notaUrgencias.fechaNota.split('.')[0];
        //console.log('2 En guardar NU-- token---->>>  ', this.token);
        console.log('2.1.- fecha de notaUrgencia-> ', this.notaUrgencias.fechaNota)
        console.log('2.2.- nuevo->notaUrgenciasId  ', this.$store.state.notaUrgenciasId);


        if (this.$store.state.notaUrgenciasId === 'NUEVO') {
          const req = {
            method: 'post',
            url: this.urlApiNotaUrgencias + this.$store.state.pacienteId,
            headers: {
              token: this.token
            },
            data: {
              fechaNota: this.notaUrgencias.fechaNota,
              diagnosticoEgreso: this.notaUrgencias.diagnosticoEgreso,
              seguro: this.notaUrgencias.seguro,
              ocupacion: this.notaUrgencias.ocupacion,
              FC: this.notaUrgencias.FC,
              FR: this.notaUrgencias.FR,
              TA: this.notaUrgencias.TA,
              T: this.notaUrgencias.T,
              peso: this.notaUrgencias.peso,
              talla: this.notaUrgencias.talla,
              antecedentesImportancia: this.notaUrgencias.antecedentesImportancia,
              resumenClinico: this.notaUrgencias.resumenClinico,
              indicaciones: this.notaUrgencias.indicaciones
            }
          };

          axios(req)
            .then((response) => {
              this.$refs.notify.showNotify("DOCUMENTO NUEVO GUARDADO", 2);
              console.log('3.1.-En guardar NUEVO  NU-- success---->>> pasé ', response.data.notaUrgencias);
              // Aquí después de que se guarda
              // deben limpiarse el contenido de las compos
              // para iniciar una nueva nota de evolución
              this.notaUrgencias = this.notaUrgenciasNuevo;

              //this.notaUrgencias = response.data.notaUrgencias;
              this.$store.commit('setNotaUrgenciasId', this.notaUrgencias._id);
              this.$store.commit('setSocketNotasUrgencias');

            })
            .catch(err => {
              console.log('3.2.-ERROR  al guardar NUEVO  NU-- fail---->>> ', err);
              this.$refs.notify.showNotify("ERROR AL GUARDAR " + err, 5);
            });
        }
        else {
          const req = {
            method: 'put',
            url: this.urlApiNotaUrgencias + this.$store.state.notaUrgenciasId,
            headers: {
              token: this.token
            },
            data: {
              fechaNota: this.notaUrgencias.fechaNota,
              diagnosticoEgreso: this.notaUrgencias.diagnosticoEgreso,
              seguro: this.notaUrgencias.seguro,
              ocupacion: this.notaUrgencias.ocupacion,
              FC: this.notaUrgencias.FC,
              FR: this.notaUrgencias.FR,
              TA: this.notaUrgencias.TA,
              T: this.notaUrgencias.T,
              peso: this.notaUrgencias.peso,
              talla: this.notaUrgencias.talla,
              antecedentesImportancia: this.notaUrgencias.antecedentesImportancia,
              resumenClinico: this.notaUrgencias.resumenClinico,
              indicaciones: this.notaUrgencias.indicaciones
            }
          };
          axios(req)
            .then((response) => {
              console.log('4.1.- En guardar NU-- success---->>> pasé ', response.data);
              this.$refs.notify.showNotify("DOCUMENTO GUARDADO", 2);
              this.$store.commit('setSocketNotasUrgencias');
              this.$store.commit('setNotaUrgenciasId', this.notaUrgencias._id);

            })
            .catch(err => {
              console.log('4.2.- ERROR  al guardar NU-- fail---->>> ', err);
              this.$refs.notify.showNotify("ERROR AL GUARDAR " + err, 5);
            });
        }
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
            this.$refs.notify.showNotify("CLICK AQUÍ PARA VER EL FORMATO", 4, response.data.pdfFile, true);
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
<style scoped>

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
