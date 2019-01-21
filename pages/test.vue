
<template>
  <div class="container">
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <pacienteTagCmp />
  </div>
</template>

<script>
import pacienteTagCmp from '../components/pacienteTagCmp';

export default {
  name: 'test',
  components: {
    pacienteTagCmp
  },
  created() {
    // // No hay sesion abierta, redirige a login
    // if (this.$store.state.token === 'NONE') {
    //   this.$router.push({ name: 'login' })
    // };

  }
};

</script>

<style>
</style>
