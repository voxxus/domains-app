import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

new Vue({
  router,
  axios,
  render: (h) => h(App),
}).$mount('#app');
