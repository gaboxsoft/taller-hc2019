
<template>
  <div class="main-container ">

    <h1 class=" text-primary">{{tituloPagina}}</h1>

    <notifyCmp ref="notify"/>

    <b-btn class="bg-success" v-on:click="guardar">GUARDAR</b-btn>
    <!--<b-btn class="bg-success" v-on:click="imprimir">IMPRIMIR</b-btn>-->

    <br />
    <br />
    <form action="#">
      <div class="row">
        <div class="col-md-10">
          <!--<div class="row">
            <div class="col-md-7 text-sm-left">{{evolucion._id}}</div>
          </div>-->
          <div class="row">
            <div class="col-md-3 text-right">fecha-hora:</div>
            <div class="col-md-5 text-left"><input type="datetime" v-model="evolucion.fecha" name="fecha"></div>
          </div>
          <div class="row">
            <div class="col-md-3  text-right">Descripción:</div>
            <div class="col-md-5  text-left"><input type="text" v-model="evolucion.descripcion" name="descripcion"></div>
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
  require('moment/locale/es');  // without this line it didn't work
  moment.locale('es')
  export default {
    name: 'evolucionCmp',
    components: {
      notifyCmp
    },
    data() {
      return {
        tituloPagina: 'NOTA DE EVOLUCIÓN',
        
        paciente: {},
        evolucion: {},
        evolucionNuevo: {
          fecha: moment(),////new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),//(new Date().toISOString()).split('.')[0],
          descripcion: ''
        }
      }
    },

    computed: {
      urlApiEvolucion: function () {
        return 'http://localhost:3000/Evolucion/';
      },
      urlGetPaciente: function () {
        return 'http://localhost:3000/paciente/' + this.$store.state.pacienteId;
      },
      urlGetEvolucion: function () {
        return 'http://localhost:3000/Evolucion/' + this.$store.evolucionId;
      },
      urlHojaEvolucionPdf: function () {
        return 'http://localhost:3000/msi14/' + this.$store.state.pacienteId;
      },
      getEvolucionId: function () {
        return this.$store.state.evolucionId;
      },
      getToken: function () {
        return this.$store.state.token;
      }
    },
    watch: {
      getEvolucionId: function () {
        console.log('notasUrgenciasCmp->Watch->getNotaUrgenciasId->', this.getNotaUrgenciasId)

        this.getCurrentPaciente(this.getToken);
        if (!this.getEvolucionId || this.getEvolucionId === 'NUEVO' || this.getEvolucionId === 'NONE') {
          console.log('AGREGANDO NUEVA NOTA DE Evolucion...2');
          this.$store.commit('setEvolucionId', 'NUEVO');
          this.evolucion = this.evolucionNuevo;
        }
        else { 
          console.log('EvolucionCmp->created()->getEvolucionId->', this.getEvolucionId)
          this.getEvolucion();
        }
        
      }
    },
    created() {
      //this.getCurrentPaciente(this.getToken);
      if (!this.getEvolucionId || this.getEvolucionId === 'NUEVO' || this.getEvolucionId === 'NONE') {
        console.log('AGREGANDO NUEVA NOTA DE Evolucion...1');
        this.$store.commit('setEvolucionId', 'NUEVO');
        this.evolucion = this.evolucionNuevo;
      }
      else { 
        console.log('EvolucionCmp->created()->getEvolucionId->', this.getEvolucionId)
        this.getEvolucion();
      }
      //console.log('EN nota urgencias.Created, Paciente= ', this.Paciente);
    },

    methods: {
      
      getEvolucion: function () {

        console.log('--1.- en EvolucionCmp->urlGetEvolucion->', this.urlGetEvolucion);
        //console.log('--1.1.- en NotasUrgenciasCmp->Token->', this.getToken);
        //console.log('--1.2.- en NotasUrgenciasCmp->Token->', this.$store.state.pacienteId);
        console.log('--1.3.- en EvolucionCmp->urlEvolucion->', this.urlApiEvolucion + this.$store.state.evolucionId);
        console.log('--1.4.- en EvolucionCmp->notaEvolucionId->', this.$store.state.evolucionId);
        //axios.get(this.urlGetNotasUrgencias, {
        axios.get(this.urlApiEvolucion + this.$store.state.evolucionId, {
          //token: token
          headers: {
            token: this.getToken
          }
        })
          .then((response) => {
            console.log('ojo 22.-response.data en Evolucion: ', response.data);
            this.evolucion = response.data.evolucion;
            //this.evolucion.fecha = this.evolucion.fecha.toISOString().replace(/T/, ' ').replace(/\..+/, '');

          },
            (error) => {
              this.err = error;
              console.log('23.-ERROR response.data en get evoluvion: ');
              this.$store.commit('setEvolucionId', undefined);
            });
      },

      getCurrentPaciente: function () {

        axios.get(this.urlGetPaciente, {
          token: this.getToken
        })
          .then((response) => {
            this.paciente = response.data.paciente;
            console.log('paciente en nota urgencias: ',this.paciente);

          },
            (error) => {
              this.err = error.response.data.error;
              this.$store.commit('setPacienteId', undefined);
            });
      },
      guardar: function () {
        
        console.log('1 En guardar Evol-- url---->>>  ', this.urlApiEvolucion + this.$store.state.evolucionId);
        this.token = this.getToken;
        this.evolucion.fecha = this.evolucion.fecha.split('.')[0];
        //console.log('2 En guardar NU-- token---->>>  ', this.token);
        console.log('2.1.- fecha de Evolucion-> ', this.evolucion.fecha)
        console.log('2.2.- nuevo->EvolucionId  ', this.$store.state.evolucionId);

        
        if (this.$store.state.evolucionId === 'NUEVO') {
          const req = {
            method: 'post',
            url: this.urlApiEvolucion + this.$store.state.pacienteId,
            headers: {
              token: this.token
            },
            data: {
              fecha: this.evolucion.fecha,
              descripcion: this.evolucion.descripcion,
              paciente: this.$store.state.pacienteId
            }
          };

          axios(req)
            .then((response) => {
              console.log('3.1.-En guardar NUEVO  evol-- success---->>> pasé ', response.data.evolucion);
              
              this.evolucion = response.data.evolucion;
              this.$refs.notify.showNotify("DOCUMENTO NUEVO GUARDADO", 2);

              this.$store.commit('setEvolucionId', this.evolucion._id);
              this.$store.commit('setSocketEvolucion');
            })
            .catch(err => {
              console.log('3.2.-ERROR  al guardar NUEVO  evol-- fail---->>> ', err);
              this.$refs.notify.showNotify("ERROR AL GUARDAR " + err, 5);
            });
        }
        else {
          const req = {
            method: 'put',
            url: this.urlApiEvolucion + this.$store.state.evolucionId,
            headers: {
              token: this.token
            },
            data: {
              fecha: this.evolucion.fecha,
              descripcion: this.evolucion.descripcion
            }
          };
          axios(req)
            .then((response) => {
              console.log('4.1.- En guardar evol-- success---->>> pasé ', response.data);
              this.$refs.notify.showNotify("DOCUMENTO GUARDADO", 2);
              this.$store.commit('setSocketEvolucion');
              this.$store.commit('setEvolucionId', this.evolucion._id);

            })
            .catch(err => {
              console.log('4.2.- ERROR  al guardar evol-- fail---->>> ', err);
              this.$refs.notify.showNotify("ERROR AL GUARDAR " + err, 5);
            });
        }
      }
      ////,
      ////imprimir: function () {

      ////  console.log('aquí en imprimir NU...', this.urlNotaUrgenciasPdf);
       
      ////  axios.get(this.urlNotaUrgenciasPdf, {
      ////    headers: {
      ////      token: this.getToken,
      ////      Accept: 'application/pdf',
      ////      responseType: 'blob'
      ////    }
      ////  })
      ////    .then((response) => {
      ////      console.log('aaquí en imprimir NU axios y regresó: ', response);
      ////      console.log('aaquí en imprimir NU axios y regresó: ', response.data.pdfFile);
      ////      this.$refs.notify.showNotify("CLICK AQUÍ PARA VER EL FORMATO", 4, response.data.pdfFile,true);
      ////    },
      ////      (error) => {
      ////        this.err = error.response.data.error;
      ////        console.log('Error en imprimir Nota Urgencias: ', this.err);
      ////        this.$refs.notify.showNotify("ERROR AL GENERAR EL FORMATO", 5);
      ////      });
      ////}
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
