<template>

  <div id="headerCmp" class="contanier fixed-top margin-bottom:200px">
    <b-navbar class="ml-auto "
              toggleable="md"
              type="dark"
              variant="info">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <a class="navbar-brand"
         href="/">
        <img src="~/assets/logoMSI-262x702.png"
             style="width: 100px; ">
      </a>

      <b-collapse is-nav
                  id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item-dropdown text="RECEPCIÓN"
                               right>
            <b-dropdown-item href="/RegistroPaciente">Registro Paciente</b-dropdown-item>
            <b-dropdown-item href="/Contrato">Contrato Prestación Servicios</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="VALORACIÓN"
                               left>
            <b-dropdown-item href="#">Consentimiento Informado</b-dropdown-item>
            <b-dropdown-item href="/hojaInicialExpediente">Hoja Inicial Expediente</b-dropdown-item>
            <b-dropdown-item href="/HistoriaClinica">História Clínica</b-dropdown-item>
            <b-dropdown-item href="#">Nota de Urgencias</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="CUIDADOS"
                               right>
            <b-dropdown-item href="#">Urgencias</b-dropdown-item>
            <b-dropdown-item href="#">Órdenes Médico </b-dropdown-item>
            <b-dropdown-item href="#">Estudios</b-dropdown-item>
            <b-dropdown-item href="#">Notas Urgencia</b-dropdown-item>
            <b-dropdown-item href="#">Evolución</b-dropdown-item>
            <b-dropdown-item href="#">Recetario</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="HOSPITALIZACIÓN"
                               right>
            <b-dropdown-item href="#">Órdenes Médico</b-dropdown-item>
            <b-dropdown-item href="#">Evolución</b-dropdown-item>
            <b-dropdown-item href="#">Historia Clínica Recién Nacido</b-dropdown-item>
            <b-dropdown-item href="#">Registro Cclínico Meonatolgía</b-dropdown-item>
            <b-dropdown-item href="#">Responsiva Mamá</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="PROC.QUIRÚGICO"
                               right>
            <b-dropdown-item href="#">Programación Quirúrgica</b-dropdown-item>
            <b-dropdown-item href="#">Consentimiento Anestésia</b-dropdown-item>
            <b-dropdown-item href="#">Consentimiento Alto Riesgo</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="CIRUGÍA"
                               right>
            <b-dropdown-item href="#">Registro Anestésia</b-dropdown-item>
            <b-dropdown-item href="#">Estudio Piezas Anatomopatlógicas</b-dropdown-item>
            <b-dropdown-item href="#">Órdenes Médico</b-dropdown-item>
            <b-dropdown-item href="#">Evolución</b-dropdown-item>
            <b-dropdown-item href="#">Hoja Quirúgica</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="EGRESO"
                               right>
            <b-dropdown-item href="#">Por Mejoría</b-dropdown-item>
            <b-dropdown-item href="#">Por Voluntario</b-dropdown-item>
            <b-dropdown-item href="#">Por Traslado</b-dropdown-item>
            <b-dropdown-item href="#">Por Defunción</b-dropdown-item>
          </b-nav-item-dropdown>

        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">

          <b-nav-item-dropdown right>
            <template slot="button-content">
              <em>Sesión</em>
            </template>
            <b-dropdown-item href="/login">Abrir</b-dropdown-item>
            <b-dropdown-item href="#">Cerrar</b-dropdown-item>
          </b-nav-item-dropdown>

        </b-navbar-nav>

      </b-collapse>
    </b-navbar>


    <pacienteTagCmp />
</div>
</template>

<script>

  import pacienteTagCmp from '~/components/pacienteTagCmp';
  
import axios from 'axios';
export default
  {
    name: 'headerCmp',
      components: {
        pacienteTagCmp
      },
    

  }


</script>


<!--<style>
  html {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
  }

  .button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;
  }

    .button--green:hover {
      color: #fff;
      background-color: #3b8070;
    }

  .button--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;
  }

    .button--grey:hover {
      color: #fff;
      background-color: #35495e;
    }
</style>-->
