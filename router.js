import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export function createVueRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: () => import('./pages/main.vue')
      },
      {
        path: '/monday',
        component: () => import('./pages/monday.vue')
      },
      {
        path: '/tuesday',
        component: () => import('./pages/tuesday.vue')
      },
      {
        path: '/wednesday',
        component: () => import('./pages/wednesday.vue')
      }
    ]
  });
}