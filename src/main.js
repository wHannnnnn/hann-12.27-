// import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import $ from 'jquery'
import 'babel-polyfill'
import Store from '@/assets/js/observable/index'
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
import { Lazyload } from 'vant';
Vue.use(Lazyload);
Vue.config.devtools = true
// mui
// import './lib/mui/css/mui.css'
// import mui from './lib/mui/js/mui.js'
// Vue.prototype.mui = mui
router.beforeEach((to, from, next) => {
  from.meta.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  next()
})
import '@/assets/css/index.css'
import url from '@/assets/js/request'
Vue.prototype.$http = url
import tools from '@/assets/js/tools'
Vue.prototype.$tools = tools
import FastClick from 'fastclick'
Vue.prototype.$storeobs = Store

FastClick.attach(document.body);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
