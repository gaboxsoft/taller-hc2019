
<template>
  <div class="container">
    <h2 class="text-primary text-center">{{tituloPagina}}</h2>
    <div>
      <pacientesCmp />
      <div id="datosGenerales"></div>
      <updatePacienteCmp style="margin-top:100px;" />
    </div>
  </div>
</template>

<script>
  import pacientesCmp from '../components/pacientesCmp';
  import updatePacienteCmp from '~/components/updatePacienteCmp';
  export default {
    name: 'RegistroPaciente',
    components: {
      pacientesCmp,
    updatePacienteCmp
    },
    data() {
      return {
        tituloPagina:'Lista de Pacientes'
      }
    },
    created() {
      // No hay sesion abierta, redirige a login
      if (this.$store.state.token === 'NONE') {
        this.$router.push({ name: 'login' })
      };
    }
  };
  
</script>
