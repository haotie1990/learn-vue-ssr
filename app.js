import Vue from 'vue';
import App from './App.vue';
import { createVueRouter } from './router';

// 导出一个工厂函数，用于创建新的Vue实例，router和store
export function createVueApp() {
  const router = createVueRouter();
  const { app } = new Vue({
    router,
    render: h => h(app)
  });
  return { app, router };
}