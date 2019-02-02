
<template>
  <div class="main-container ">

    <h1 class=" text-primary">{{tituloPagina}}</h1>

    <notifyCmp ref="notify" />

    <b-btn class="bg-success" v-on:click="guardar">GUARDAR</b-btn>
    <form action="#">
      <div class="row">
        <div class="col-md-10">
          <div class="row">
            <div class="col-md-3 text-right">folio:</div>
            <div class="col-md-7 text-left"><input type="text" v-model="paciente.folioCuenta" name="folioCuenta"></div>
          </div>
          <div class="row">
            <div class="col-md-3  text-right">Nombre:</div>
            <div class="col-md-7  text-left"><input type="text" v-model="paciente.nombre" name="nombre"></div>
          </div>
          <div class="row">
            <div class="col-md-3  text-right">Estado civíl:</div>
            <div class="col-md-7  text-left"><input type="text" v-model="paciente.edoCivil" name="edoCivil"></div>
          </div>
          <div class="row">
            <div class="col-md-3  text-right">Género:</div>
            <div class="col-md-7  text-left"><input type="text" v-model="paciente.genero" name="genero"></div>
          </div>
          <div class="row">
            <div class="col-md-3  text-right">Fecha nacimiento:</div>
            <div class="col-md-7  text-left"><input type="text" v-model="paciente.fechaNacimiento" name="fechaNacimiento"></div>
          </div>
          <div class="row">
            <div class="col-md-3  text-right">Ocupación:</div>
            <div class="col-md-7  text-left"><input type="text" v-model="paciente.ocupacion" name="fechaNacimiento"></div>
          </div>
          <div class="row">
            <div class="col-md-3  text-right">Calle:</div>
            <div class="col-md-7  text-left"><input type="text" v-model="paciente.calle" name="calle"></div>
          </div>
          <div class="row">
            <div class="col-md-3  text-right">Número exterior:</div>
            <div class="col-md-7  text-left"><input type="text" v-model="paciente.numExterior" name="numExterior"></div>
          </div>
          <div class="row">
            <div class="col-md-3  text-right">Número interior:</div>
            <div class="col-md-7  text-left"><input type="text" v-model="paciente.numInterior" name="numInterior"></div>
          </div>
          <div class="row">
            <div class="col-md-3  text-right">Colonia:</div>
            <div class="col-md-7  text-left"><input type="text" v-model="paciente.colonia" name="colonia"></div>
          </div>
          <div class="row">
            <div class="col-md-3  text-right">Municipio:</div>
            <div class="col-md-7  text-left"><input type="text" v-model="paciente.municipio" name="municipio"></div>
          </div>
          <div class="row">
            <div class="col-md-3  text-right">Estado:</div>
            <div class="col-md-7  text-left"><input type="text" v-model="paciente.entidad" name="entidad"></div>
          </div>
          <div class="row">
            <div class="col-md-3  text-right">País:</div>
            <div class="col-md-7  text-left"><input type="text" v-model="paciente.pais" name="pais"></div>
          </div>
          <div class="row">
            <div class="col-md-3  text-right">CP:</div>
            <div class="col-md-7  text-left"><input type="text" v-model="paciente.CP" name="CP"></div>
          </div>
          <!-- MÉDICO TRATANTE -->
          <div>
            <h5>--ACERCA DEL MÉDICO TRATANTE---</h5>
            <div class="row">
              <div class="col-md-3  text-right">NOMBRE Médico tratante (MT):</div>
              <div class="col-md-7  text-left"><input type="text" v-model="paciente.nombreMT" name="nombreMT"></div>
            </div>
            <div class="row">
              <div class="col-md-3  text-right">Cédula profesional MT:</div>
              <div class="col-md-7  text-left"><input type="text" v-model="paciente.cedulaMT" name="cedulaMT"></div>
            </div>
            <div class="row">
              <div class="col-md-3  text-right">Institución expide Título MT:</div>
              <div class="col-md-7  text-left"><input type="text" v-model="paciente.institucionMT" name="institucionMT"></div>
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
  const urlGetPacientes = 'http://localhost:3000/Pacientes?limite=0&desde=0';
  const MAX_SIZE_NOMBRE = 50;
  import axios from 'axios';

  import notifyCmp from '~/components/notifyCmp';

  export default {
    name: 'updatePacienteCmp',
    components: {
      notifyCmp
    },
    data() {
      return {
        tituloPagina: 'DATOS GENERALES DEL PACIENTE SELECCIONADO',
        totalPacientes: 0,
        pacientes: {},
        token: '',
        paciente: {}
      }
    },
    computed: {
      getToken() {
        return this.$store.state.token;
      },
      urlApiPaciente: function () {
        return 'http://localhost:3000/paciente/' + this.$store.state.pacienteId;
      },
      urlGetPaciente: function () {
        return 'http://localhost:3000/paciente/' + this.$store.state.pacienteId;
      },
      getPacienteId() {
        return this.$store.state.pacienteId;
      }
    },
    watch: {
      getPacienteId: function() {
        this.getCurrentPaciente(this.getToken);
      }
    },
    created() {
      this.getCurrentPaciente(this.getToken);
    },


    methods: {
      guardar: function () {

        this.token = this.getToken;
        const req = {
          method: 'put',
          url: this.urlGetPaciente,
          headers: {
            token: this.token
          },
          data: {
            // folioCuenta,
            //'nombre', 'fechaNacimiento', 'genero',
            //'calle', 'numInterior', 'numExterior',
            //'colonia', 'municipio',
            //'entidad', 'pais', 'telefonos', 'CP'

            folioCuenta: this.paciente.folioCuenta,
            nombre: this.paciente.nombre,
            fechaNacimiento: this.paciente.fechaNacimiento,
            genero: this.paciente.genero,
            ocupacion: this.paciente.ocupacion,
            calle: this.paciente.calle,
            numInterior: this.paciente.numInterior,
            numExterior: this.paciente.numExterior,
            colonia: this.paciente.colonia,
            municipio: this.paciente.municipio,
            entidad: this.paciente.entidad,
            CP: this.paciente.CP,
            telefonos: this.paciente.telefonos,
            pais: this.paciente.pais,
            nombreMT: this.paciente.nombreMT,
            cedulaMT: this.paciente.cedulaMT,
            institucionMT: this.paciente.institucionMT,
          }
        };
        axios(req)
          .then((response) => {
            //console.log('En guardar hie-- success---->>> pasé ', response.data);
            this.$refs.notify.showNotify("DOCUMENTO GUARDADO", 2.5);

          })
          .catch(err => {
            //console.log('ERROR  al guardar HIE-- fail---->>> pasé ', err.response);
            this.$refs.notify.showNotify("ERROR AL GUARDAR: " + err.response, 2.5);
          });
      },
      eliminar: function () {
        return true;
      }
      ,
      archiva: () => {
        return true;

      },
      modificar: (pacienteId) => {
        this.$store.commit('setPacienteId', pacienteId)


      },
      seleccionar: function (pacienteId) {
        //console.log('aquí en seleccionar paciente, id: ', pacienteId);
        this.$store.commit('setPacienteId', pacienteId)
        this.$router.push({ name: 'index' })
        this.$forceUpdate();

      },
      addPaciente: function () {
        return true;

      },
      getCurrentPaciente: function (token) {

        axios.get(this.urlGetPaciente, {
          token: token
        })
          .then((response) => {
            this.paciente = response.data.paciente;
            //console.log('urlGetPaciente en UPDATE_PACIENTEcmp: ', this.urlGetPaciente);
            //console.log('response.data en UPDATE_PACIENTEcmp: ', response.data);
            
            //this.$store.commit('setCurrentPaciente', this.paciente);
          },
          (error) => {
            //console.log('paciente en updatePaciente ---ERROR -- NO EXISTE: ', this.urlGetPaciente);
            this.err = error.response.data.error;
            //console.log('en UpdatePaciente->getCurrentPaciente->error', this.err);
              //this.$store.commit('setCurrentPaciente', undefined);
              this.paciente = {
                folioCuenta: '',
                nombre: '',
                genero: '',
                fechaNacimiento: '',
                calle: '',
                numeroInterior: '',
                numeroExterior: '', 
                colonia: '',
                municipio: '',
                entidad: '',
                pais: '',
                cp: '',
                telefonos: '',
                ////////////////
                // Hoja inicial expediente
                fechaIngreso: '',
                alergias: '',
                diagnosticoIngreso: '',
                otrosDiagnosticos: '',
                tituloMT: '',
                tituloAbrMT: '',
                nombreMT: '',
                cedulaMT: '',
                institucionMT: '',
                especialidadMT: '',

                //////////////////////////
                //// Nota de urgencias
                fecha1: '',
                seguro: '',
                ocupacion: '',
                diagnosticoEgreso: '',
                FC: '',
                FR: '',
                TA: '',
                T: '',
                peso1: '',
                talla1: '',
                antecedentesImportancia1: '',
                resumenClinico1: '',
                indicaciones1: '',

                /////////////////////////
                // Historia clínica
                lugarOrigen: '',
                antHeredoFam: '',
                personalesPato: '',
                personalesNoPato: '',
                ago: '',
                tensionMens: '',
                ritmo: '',
                inicioVidaSexual: '',
                gestados: '',
                partos: '',
                abortos: '',
                cesareas: '',
                fechaUltimpoParto: '',
                fechaUltimoAborto: '',
                pesoProductos: '',
                fechaUltimaRegla: '',
                fechaUltimaCitoCervix: '',
                circuncision: '',
                protecciónMenstrual: '',
                otrosHistoriaClinica: '',
                padecimientoActual: '',
                peso: '',
                talla: '',
                temperatura: '',
                tensionArterial: '',
                craneo: '',
                cara: '',
                fondoOcular: '',
                cuello: '',
                cardioPulmunar: '',
                abdomen: '',
                mamas: '',
                tactoVaginal: '',
                tactoRectal: '',
                miembros: '',
                ID: '',
                TX: '',
                LAB: '',
                USG: '',
                RX: '',
                /////////////////////////
                //Sello
                fechaCreacionSe: '',
                fechaModificacionSe: '',
                situacionSe: 1, //1-activo
                //fechaBorrado: default nada
                usuarioSe: req.usuario._id
              };
            });
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
