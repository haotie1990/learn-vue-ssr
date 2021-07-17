import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// 创建路由的工厂方法，保证每一个请求都是不同的路由实例
export function createVueRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'home',
        component: () => import('./pages/main.vue')
      },
      {
        path: '/monday',
        name: 'monday',
        component: () => import('./pages/monday.vue')
      },
      {
        path: '/tuesday',
        name: 'tuesday',
        component: () => import('./pages/tuesday.vue')
      },
      {
        path: '/wednesday',
        name: 'wednesday',
        component: () => import('./pages/wednesday.vue')
      }
    ]
  });
}