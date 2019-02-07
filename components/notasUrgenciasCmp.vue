
<template>
  <div class="main-container ">
    <h1 class=" text-primary">{{tituloPagina}}</h1>
    <notifyCmp ref="notify" />
    <b-btn class="bg-success" v-on:click="agregar">NUEVA NOTA DE URGENCIAS</b-btn>
    <!--<b-btn class="bg-success" v-on:click="imprimir">IMPRIMIR</b-btn>-->

    <p></p>
    <div class="row">
      <div class="col-md-6">
        
        <!--<div class="row">
          <div class="col-md-3 text-right">fecha-hora:
            <div class="col-md-5 text-left"><input type="datetime" v-model="notaUrgencias.fechaNota" name="fechaNota"></div>
          </div>
          <div class="col-md-3 text-right">id
            <div class="col-md-5 text-left"><input type="datetime" v-model="notaUrgencias.fechaNota" name="fechaNota"></div>
        </div>-->
        
          <no-ssr>
            <table class="table table-striped table-bordered table-hover table-info ">
              <tr>
                <!--<td>ID</td>-->
                <td>FECHA</td>
                <td>DIAGNOSTICO</td>
                <td>INDICACIONES</td>
              </tr>
              <tr v-model="notasUrgencias"
                  v-for="nu in notasUrgencias">
                <!--<td>{{nu._id}}</td>-->
                <td>{{nu.fechaNota}}</td>
                <!--<td style="width:200px;">{{nu.diagnosticoEgreso}}</td>-->
                <td>{{nu.diagnosticoEgreso}}</td>
                <td>{{nu.indicaciones}}</td>

                <td style="width:25px;">
                  <b-btn btn-xs
                         v-on:click="imprimir(nu._id)">
                    Imp
                    <!-- <img src="../assets/iconos/boton-seleccionar-documento.png" style="width: 25px;">-->
                  </b-btn>
                  <!--</td>
    <td style="width:25px;">-->
                  <b-btn btn-xs
                         v-on:click="seleccionar(nu._id)">
                    Sel
                    <!-- <img src="../assets/iconos/boton-seleccionar-documento.png" style="width: 25px;">-->
                  </b-btn>
                </td>

              </tr>
            </table>
          </no-ssr>



        </div>     
    </div>
    <p></p>


    <!--<b-btn class="bg-success" v-on:click="guardar">GUARDAR</b-btn>
  <b-btn class="bg-success" v-on:click="imprimir">IMPRIMIR</b-btn>-->

  </div>
</template>

<script>
  import axios from 'axios';
  import notifyCmp from '~/components/notifyCmp';
  const moment = require('moment');
  //require('moment/locale/es');  // without this line it didn't work
  //moment.locale('es')
  export default {
    name: 'notasUrgenciasCmp',
    components: {
      notifyCmp
    },
    data() {
      return {    
        tituloPagina: 'NOTAS DE URGENCIAS',
        notasVacia: [
          { _id: '', fechaNota: '', diagnosticoEgreso: '', indicaciones: '' }
        ],
        notasUrgencias:{},
        notaUrgenciasId: {},
        notaUrgenciaId:''
      }
    },

    computed: {
      urlGetPaciente: function () {
        return 'http://localhost:3000/paciente/' + this.$store.state.pacienteId;
      },
      urlGetNotaUrgencias: function () {
        return 'http://localhost:3000/NotaUrgencias/' + this.$store.state.notaUrgenciasId;
      },
      urlGetNotasUrgencias: function () {
        return 'http://localhost:3000/NotasUrgencias/' + this.$store.state.pacienteId;
      },
      urlNotaUrgenciasPdf: function () {
        return 'http://localhost:3000/msi12/' + this.$store.state.pacienteId;
      },
      getSocketNotasUrgencias: function () {
        return this.$store.state.socketNotasUrgencias;
      },
      //setPaciente: function () {
      //  this.$store.commit(this.currentPaciente);
      //},
      getToken: function () {
        return this.$store.state.token;
      }
    },
    watch: {
      getSocketNotasUrgencias: function () {
        this.getNotasUrgencias(this.getToken);
      }
    },
    created() {
      //this.getCurrentPaciente(this.getToken);
      this.getNotasUrgencias(this.getToken);
      //console.log('--- primero ----EN nota urgencias.Created, Paciente= ', this.Paciente);
    },

    methods: {
      agregar: function () {
        console.log('aquí en agregar nota urgencias');
        //this.$store.commit('setPacienteId', pacienteId)
        this.$store.commit('setNotaUrgenciasId', 'NUEVO');

      },
      seleccionar: function (notaUrgenciasId) {
        if (notaUrgenciasId=='') {
          return;
        }
        console.log('aquí en seleccionar nota urgencia, id: ', notaUrgenciasId);
        //this.$store.commit('setPacienteId', pacienteId)
        this.$store.commit('setNotaUrgenciasId', notaUrgenciasId)

      },
      getCurrentPaciente: function (token) {

        axios.get(this.urlGetPaciente, {
          token: token
        })
          .then((response) => {
            this.paciente = response.data.paciente;
            //console.log('response.data en nota urgencias: ', response.data);
            //console.log('paciente en nota urgencias: ', this.paciente);
          },
            (error) => {
              this.err = error.response.data.error;
            });
      },

      getNotasUrgencias: function (token) {

        //console.log('--1.- en NotasUrgenciasCmp->urlNotasUrgencias->', this.urlGetNotasUrgencias);
        //console.log('--1.1.- en NotasUrgenciasCmp->Token->', token);
        //console.log('--1.2.- en NotasUrgenciasCmp->Token->', this.$store.state.pacienteId);
        //axios.get(this.urlGetNotasUrgencias, {
        axios.get(this.urlGetNotasUrgencias, {
          //token: token
          headers: {
            token: this.getToken
          }
        })
          .then((response) => {
            //console.log('21.-response.data en nota urgencias: ', response.data);
            //console.log('22.-response.data.conteo en nota urgencias: ', response.data.conteo);
            //console.log('23.-response.data.notasUrgencias: ', response.data.notasUrgencias);
            if (response.data.conteo = 0) {
              this.notasUrgencias = notasVacia;
            }

            else {
              this.notasUrgencias = response.data.notasUrgencias;
              //console.log('nota urgencias_>', this.notasUrgencias);
              for (var i = 0; i < this.notasUrgencias.length; i++) {
                this.notasUrgencias[i].fechaNota = moment(this.notasUrgencias[i].fechaNota).format('YYYY-MM-DD HH:mm');
              }
              //for (let x in this.notasUrgencias) {
              //  console.log('fecha_>', x.fechaNota);
               
              //}
            }
            //console.log('24.-final this.notasUrgencias: ', this.notasUrgencias);
          },
            (error) => {
              this.err = error.response.data.error;
              this.notasUrgencias = this.notasVacia;

              //this.$store.commit('setCurrentPaciente', undefined);
            });
      },
    
      imprimir: function (notaUrgenciasId) {
        if (notaUrgenciasId == '') {
          return;
        }
        //console.log('aquí en imprimir NU...', this.urlNotaUrgenciasPdf);
        this.seleccionar(notaUrgenciasId);
        axios.get(this.urlNotaUrgenciasPdf, {
          headers: {
            token: this.getToken,
            Accept: 'application/pdf',
            responseType: 'blob',
            notaUrgenciasId: notaUrgenciasId
          }
        })
          .then((response) => {
            //console.log('aaquí en imprimir NU axios y regresó: ', response);
            //console.log('aaquí en imprimir NU axios y regresó: ', response.data.pdfFile);
            this.$refs.notify.showNotify("CLICK AQUÍ PARA VER EL FORMATO", 4, response.data.pdfFile,true);
          },
            (error) => {
              this.err = error.response.data.error;
              //console.log('Error en imprimir Nota Urgencias: ', this.err);
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
