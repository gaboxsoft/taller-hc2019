<template>
  
    <div id="notify"
         class="alert alert-danger" role="alert"
         v-show="show">
  </div>
</template>


<script>

  export default
    {
      name: 'notifyCmp',
      computed: {
      },
      data(){
        return{
          show: false
        }
      },

      methods: {
        showNotify: function (mensaje, tiempo, link, target) {

          var myDivNotify = document.getElementById('notify');

          var myElement = "";
          if (link) {
            myElement = document.createElement('a');
            myElement.innerText = mensaje;
            myElement.href = link;
            if (target) {
              myElement.target = "_blank"
            }
          }
          else {
            myElement = document.createElement('p');
            myElement.innerText = mensaje;
          }
          myDivNotify.appendChild(myElement);
          this.show = true;
          //var myLink = document.createElement('a');
          //myLink.href = "#";
          //myLink.innerText = mensaje;
          //myLink.target = "_blank";

          //myDiv.appendChild(myLink);

          //console.log("myElement: ",myElement);
          //console.log("myDivNotify: ",myDivNotify);
          setTimeout(() => { this.show = false; myDivNotify.removeChild(myElement); }, tiempo * 1000);
        }

      }

  }
</script>

<!--<style scoped>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
.container {
  /*min-height: 100vh;
  display: flex;*/
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 5px, 5px, 5px, 0px;
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
