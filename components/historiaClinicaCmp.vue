
<template>
  <div>
    <h2 class=" text-primary">{{tituloPagina}}</h2>
    <notifyCmp ref="notify" />
    <b-btn class="button-right bg-success" v-on:click="guardar">GUARDAR</b-btn>
    <b-btn class="button-right bg-success" v-on:click="imprimir">IMPRIMIR</b-btn>
    <br />
    <br />
    <form action="#">


      <div>Estado civíl: <input class="input-text" type="text" v-model="paciente.edoCivil" name="edoCivil"></div>
      <div>Lugar de Origen: <input class="input-text" type="text" v-model="paciente.lugarOrigen" name="lugarOrigen"></div>

      <label for="paciente.antHeredoFam">Antecedentes Heterodofamiliares:</label><br>
      <textarea class="input-text" v-model="paciente.antHeredoFam" name="antHeredoFam" rows="3" cols="50"></textarea>
      <br />
      <label for="paciente.personalesPato">Personales patológicos:</label><br>
      <textarea class="input-text" v-model="paciente.personalesPato" name="personalesPato" rows="3" cols="50">
          </textarea>
      <br />
      <label for="paciente.personalesNoPato">Personales NO patológicos:</label><br>
      <textarea class="input-text" v-model="paciente.personalesNoPato" name="personalesNoPato" rows="3" cols="50">
          </textarea>
      <br />

      <div>
        Género:
        <input type="radio" id="hombre" value="H" v-model="paciente.genero">
        Masculino
        <input type="radio" id="mujer" value="M" v-model="paciente.genero">
        Femenino
      </div>

      <div class="rounded" style="background-color:lightpink" v-show="paciente.genero==='M'">
        <label for="paciente.menarca">Menarca:</label>
        <input class="input-text" type="text" v-model="paciente.menarca" name="menarca">
        <br />
        <label for="paciente.tensionMens">Tensión menstrual:</label>
        <input class="input-text" type="text" v-model="paciente.tensionMens" name="tensionMens">
        <br />
        <!--<label for="paciente.ritmo">Ritmo:</label>
    <input class="input-text" type="text" v-model="paciente.ritmo" name="ritmo">-->
        <!--  -->
        <div>
          Ritmo:
          <input type="radio" id="regular" value="REGULAR" v-model="paciente.ritmo">
          <label for="regular">Regular</label>
          <input type="radio" id="irregular" value="IRREGULAR" v-model="paciente.ritmo">
          <label for="irregular">Irregular</label>
        </div>

        <label for="paciente.inicioVidaSexual">Inicio de vida sexual activa:</label>
        <input class="input-text" type="text" v-model="paciente.inicioVidaSexual" name="inicioVidaSexual">
        <br />
        <label for="paciente.gestados">Gestados:</label>

        <input class="input-text" type="text" v-model="paciente.gestados" name="gestados">
        <br />
        <label for="paciente.partos">Partos:</label>
        <input class="input-text" type="text" v-model="paciente.partos" name="partos">
        <br />
        <label for="paciente.abortos">Abortos:</label>
        <input class="input-text" type="text" v-model="paciente.abortos" name="abortos">
        <br />
        <label for="paciente.cesareas">Cesareas:</label>
        <input class="input-text" type="text" v-model="paciente.cesareas" name="cesareas">
        <br />
        <label for="paciente.fechaUltimpoParto">Fecha Ultimpo Parto:</label>
        <input class="input-text" type="text" v-model="paciente.fechaUltimpoParto" name="fechaUltimpoParto">
        <br />
        <label for="paciente.fechaUltimoAborto">Fecha Ultimo Aborto:</label>
        <input class="input-text" type="text" v-model="paciente.fechaUltimoAborto" name="fechaUltimoAborto">
        <br />
        <label for="paciente.pesoProductos">Peso Productos:</label>
        <input class="input-text" type="text" v-model="paciente.pesoProductos" name="pesoProductos">
        <br />
        <label for="paciente.fechaUltimaRegla">Fecha Ultima Regla:</label>
        <input class="input-text" type="text" v-model="paciente.fechaUltimaRegla" name="fechaUltimaRegla">
        <br />
        <label for="paciente.fechaUltimaCitoCervix">Fecha Ultima Citocervix:</label>
        <input class="input-text" type="text" v-model="paciente.fechaUltimaCitoCervix" name="fechaUltimaCitoCervix">
        <br />
        <label for="paciente.proteccionMenstrual">Protección Menstrual:</label>
        <input class="input-text" type="text" v-model="paciente.proteccionMenstrual" name="proteccionMenstrual">
        <br />
        <label for="paciente.mamas">Mamas:</label>
        <input class="input-text" type="text" v-model="paciente.mamas" name="mamas">
        <br />
        <label for="paciente.tactoVaginal">Tacto Vaginal:</label>
        <input class="input-text" type="text" v-model="paciente.tactoVaginal" name="tactoVaginal">
        <br />

      </div>
      <div class="rounded" style="background-color:dodgerblue" v-show="paciente.genero==='H'">
        <label for="paciente.circuncision">Circuncisión:</label>
        <input class="input-text" type="text" v-model="paciente.circuncision" name="circuncision">
        <br />
        </div>
        <label for="paciente.otrosHistoriaClinica">Otros:</label>
        <input class="input-text" type="text" v-model="paciente.otrosHistoriaClinica" name="otrosHistoriaClinica">
        <br />
        <label for="paciente.padecimientoActual">Padecimiento Actual:</label>
        <input class="input-text" type="text" v-model="paciente.padecimientoActual" name="padecimientoActual">
        <br />
        <label for="paciente.peso">Peso:</label>
        <input class="input-text" type="text" v-model="paciente.peso" name="peso">
        <br />
        <label for="paciente.talla">Talla:</label>
        <input class="input-text" type="text" v-model="paciente.talla" name="talla">
        <br />
        <label for="paciente.temperatura">Temperatura:</label>
        <input class="input-text" type="text" v-model="paciente.temperatura" name="temperatura">
        <br />
        <label for="paciente.tensionArterial">Tension Arterial:</label>
        <input class="input-text" type="text" v-model="paciente.tensionArterial" name="tensionArterial">
        <br />
        <label for="paciente.craneo">Craneo:</label>
        <input class="input-text" type="text" v-model="paciente.craneo" name="craneo">
        <br />
        <label for="paciente.cara">Cara:</label>
        <input class="input-text" type="text" v-model="paciente.cara" name="cara">
        <br />
        <label for="paciente.fondoOcular">Fondo Ocular:</label>
        <input class="input-text" type="text" v-model="paciente.fondoOcular" name="fondoOcular">
        <br />
        <label for="paciente.cuello">cuello:</label>
        <input class="input-text" type="text" v-model="paciente.cuello" name="cuello">
        <br />
        <label for="paciente.cardioPulmunar">Cardio Pulmunar:</label>
        <input class="input-text" type="text" v-model="paciente.cardioPulmunar" name="cardioPulmunar">
        <br />
        <label for="paciente.abdomen">Abdomen:</label>
        <input class="input-text" type="text" v-model="paciente.abdomen" name="abdomen">
        <br />
        <label for="paciente.tactoRectal">Tacto Rectal:</label>
        <input class="input-text" type="text" v-model="paciente.tactoRectal" name="tactoRectal">
        <br />
        <label for="paciente.miembros">Miembros:</label>
        <input class="input-text" type="text" v-model="paciente.miembros" name="miembros">
        <br />
        <label for="paciente.ID">ID:</label>
        <input class="input-text" type="text" v-model="paciente.ID" name="ID">
        <br />
        <label for="paciente.TX">TX:</label>
        <input class="input-text" type="text" v-model="paciente.TX" name="TX">
        <br />
        <label for="paciente.LAB">LAB:</label>
        <input class="input-text" type="text" v-model="paciente.LAB" name="LAB">
        <br />
        <label for="paciente.USG">USG:</label>
        <input class="input-text" type="text" v-model="paciente.USG" name="USG">
        <br />
        <label for="paciente.RX">RX:</label>
        <input class="input-text" type="text" v-model="paciente.RX" name="RX">

    </form>
    <b-btn class="button-right bg-success" v-on:click="guardar">GUARDAR</b-btn>
    <b-btn class="button-right bg-success" v-on:click="imprimir">IMPRIMIR</b-btn>
    <br />
    <br />
    <br />
    <br />
  </div>
</template>
<script>
  import axios from 'axios';
  import notifyCmp from '~/components/notifyCmp';

  export default {
    name: 'historiaClinicaCmp',
    components: {
      notifyCmp
    },
    data() {
      return {
        tituloPagina: 'HISTORIA CLÍNICA',
        /////////////////////////
        // Historia Clínica
        /////////////////////////
        paciente: {
          edoCivil: '',
          lugarOrigen: '',
          antHeredoFam: '',
          personalesPato: '',
          personalesNoPato: '',
          genero:'',
          menarca: '',
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
          proteccionMenstrual: '',
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
        }
      }
    },

    computed: {
      urlGetPaciente: function () {
        return 'http://localhost:3000/paciente/' + this.$store.state.pacienteId;
      },
      urlHistoriaClinica: function () {
        return 'http://localhost:3000/HistoriaClinica/' + this.$store.state.pacienteId;
      },
      urlHistoriaClinicaPdf: function () {
        return 'http://localhost:3000/msi11/' + this.$store.state.pacienteId;
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
      //console.log('EN historiaClinica.Created, Paciente= ', this.Paciente);
    },

    methods: {

      getCurrentPaciente: function (token) {

        axios.get(this.urlGetPaciente, {
          token: token
        })
          .then((response) => {
            this.paciente = response.data.paciente;
            //console.log('response.data en historia clinica: ', response.data);
            //console.log('paciente en historia clinica: ',this.paciente);
            //this.$store.commit('setCurrentPaciente', this.paciente);
          },
            (error) => {
              this.err = error.response.data.error;
              this.$store.commit('setPacienteId', undefined);
            });
      },
      guardar: function () {
        //console.log('1 En guardar HC-- url---->>>  ', this.urlHistoriaClinica);
        this.token = this.getToken;
        //console.log('2 En guardar hie-- token---->>>  ', this.token);
        const req = {
          method: 'put',
          url: this.urlHistoriaClinica,
          headers: {
            token: this.token
          },
          data: {
            edoCivil: this.paciente.edoCivil,
            lugarOrigen: this.paciente.lugarOrigen,
            antHeredoFam: this.paciente.antHeredoFam,
            personalesPato: this.paciente.personalesPato,
            personalesNoPato: this.paciente.personalesNoPato,
            genero: this.paciente.genero,
            menarca: this.paciente.menarca,
            tensionMens: this.paciente.tensionMens,
            ritmo: this.paciente.ritmo,
            inicioVidaSexual: this.paciente.inicioVidaSexual,
            gestados: this.paciente.gestados,
            partos: this.paciente.partos,
            abortos: this.paciente.abortos,
            cesareas: this.paciente.cesareas,
            fechaUltimpoParto: this.paciente.fechaUltimpoParto,
            fechaUltimoAborto: this.paciente.fechaUltimoAborto,
            pesoProductos: this.paciente.pesoProductos,
            fechaUltimaRegla: this.paciente.fechaUltimaRegla,
            fechaUltimaCitoCervix: this.paciente.fechaUltimaCitoCervix,
            circuncision: this.paciente.circuncision,
            proteccionMenstrual: this.paciente.proteccionMenstrual,
            otrosHistoriaClinica: this.paciente.otrosHistoriaClinica,
            padecimientoActual: this.paciente.padecimientoActual,
            peso: this.paciente.peso,
            talla: this.paciente.talla,
            temperatura: this.paciente.temperatura,
            tensionArterial: this.paciente.tensionArterial,
            craneo: this.paciente.craneo,
            cara: this.paciente.cara,
            fondoOcular: this.paciente.fondoOcular,
            cuello: this.paciente.cuello,
            cardioPulmunar: this.paciente.cardioPulmunar,
            abdomen: this.paciente.abdomen,
            mamas: this.paciente.mamas,
            tactoVaginal: this.paciente.tactoVaginal,
            tactoRectal: this.paciente.tactoVaginal,
            miembros: this.paciente.miembros,
            ID: this.paciente.ID,
            TX: this.paciente.TX,
            LAB: this.paciente.LAB,
            USG: this.paciente.USG,
            RX: this.paciente.RX,
          }
        };
        axios(req)
          .then((response) => {
            //console.log('En guardar HC-- success---->>> pasé ', response.data);
            this.$refs.notify.showNotify("DOCUMENTO GUARDADO", .5);

          })
          .catch(err => {
            //console.log('ERROR  al guardar HC-- fail---->>> ', err.response);
            this.$refs.notify.showNotify("ERROR AL GUARDAR " + err, 5);
          });
      },
      imprimir: function () {

        //console.log('aquí en imprimir HC...', this.urlHistoriaClinicaPdf);

        axios.get(this.urlHistoriaClinicaPdf, {
          headers: {
            token: this.getToken,
            Accept: 'application/pdf',
            responseType: 'blob'
          }
        })
          .then((response) => {
            //console.log('aaquí en imprimir HC axios y regresó: ', response);
            //console.log('aaquí en imprimir HC axios y regresó: ', response.data.pdfFile);
            this.$refs.notify.showNotify("CLICK AQUÍ PARA VER EL FORMATO", 4, response.data.pdfFile, true);
          },
            (error) => {
              this.err = error.response.data.error;
              //console.log('Error en imprimirHojaInicialExpediente: ', this.err);
              this.$refs.notify.showNotify("ERROR AL GENERAR EL FORMATO", 5);
            });
      }
    }
  };

</script>
