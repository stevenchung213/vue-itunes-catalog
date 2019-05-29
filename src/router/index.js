import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'my media',
      component: Home
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/components/Search')
  
    },
    {
      path: '*',
      name: 'not found',
      component: () => import('@/components/404')
    }
  ]
});
