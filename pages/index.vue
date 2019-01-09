<template>
  <section class="container">
    <div>
      <logo/>
      <h1 class="title">
        nuxt-node
      </h1>
      <h2 class="subtitle">
        Nodejs and Vue with Express in parallel
      </h2>
      <div class="links">
        <!--//target="_blank" class="button--green"-->
        <a href="http://localhost:3000/login"
           class="btn-primary ">Inicia sesión</a>
        <a href="https://github.com/nuxt/nuxt.js"
           target="_blank"
           class="button--grey">GitHub</a>
      </div>
    </div>

    <!--<div class="container" >
      <h1>Nombres:{{listNames.data}}</h1>
      <ul>
          <li v-for='(key,value) in listNames.data'>{{key}}: {{value}}</li>
      </ul>
    </div>-->
  </section>
</template>

<script>
  import Logo from '~/components/Logo.vue'

  export default {
    
  components: {
    Logo
    }
//    ,
  
//  data(){
//            return{
//                listNames:''
//            }
//        },
//  created(){

//  this.getNames();
//  },
//  methods:{
//    getNames: function (){
//    axios.get('/api/names').then(res=>{
//this.listNames=res.data;
//    });
//    }
  //}
}
</script>

<style>

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
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
}
</style>
