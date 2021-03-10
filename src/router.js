import Vue from 'vue';
import Router from 'vue-router';
// eslint-disable-next-line import/extensions
import Home from '@/views/Home';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/domainsApp',
      component: () => import('./views/DomainsApp.vue'),
    },
  ],
});
