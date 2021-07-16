import { createVueApp } from "./app";

const { app, router } = createVueApp();

router.onReady(() => {
  app.$mount('#app');
});