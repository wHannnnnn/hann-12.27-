<template>
  <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
export default {
    methods: {

    }, 
    mounted(){
      var htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;

      //获取页面的HTML Dom
      var htmlDom = document.getElementsByTagName('html')[0];

      htmlDom.style.fontSize = htmlWidth / 10 + 'px';

      window.addEventListener('resize',function(e){
        var htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
        htmlDom.style.fontSize = htmlWidth / 10 + 'px';
      })
    }
}
</script>
