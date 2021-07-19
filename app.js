import Vue from 'vue';
import App from './App.vue';
import { createVueRouter } from './router';
import { createVueStore } from './store';
import { sync } from 'vuex-router-sync';

// 导出一个工厂函数，用于创建新的Vue实例，router和store
export function createVueApp() {
  const router = createVueRouter();
  const store = createVueStore();

  // https://github.com/vuejs/vuex-router-sync/blob/master/README.zh-cn.md
  // 把 Vue Router 当前的 $route 同步为 Vuex 状态的一部分
  // 该库在 store 上增加了一个名为 route 的模块，用于表示当前路由的状态
  // store.state.route.path   // current path (字符串类型)
  // store.state.route.params // current params (对象类型)
  // store.state.route.query  // current query (对象类型)
  sync(store, router);

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });
  return { app, router, store };
}