import Vue from "vue";
import { createVueApp } from "./app";

const { app, router, store } = createVueApp();

if (window.__INITIAL_STATE__) {
  // https://vuex.vuejs.org/zh/api/#replacestate
  // 客户端替换store的根状态，完成与服务的状态同步
  state.replaceState(window.__INITIAL_STATE__);
}

Vue.mixin({
  // client-only
  // 此处官方教程有较详细的讨论：https://ssr.vuejs.org/zh/guide/data.html#客户端数据预取-client-data-fetching
  // 
  beforeRouteUpdate(to, from, next) {
    const { asyncData } = this.$options;
    if (asyncData) {
      asyncData({ store: this.$store, router: this.$router })
        .then(next, next);
    } else {
      next();
    }
  },
  beforeMount() {
    const { asyncData } = this.$options;
    if (asyncData) {
      // 将asyncData返回的Promise分配给dataFetch
      // 这样我们在组件中，可以使用this.dataFetch.then(...)来执行数据准备就绪后的操作
      this.dataFetch = asyncData({ store: this.$store, router: this.$router });
    }
  }
})

router.onReady(() => {
  // * https://cn.vuejs.org/v2/api/#vm-mount
  // 客户端手动挂载
  app.$mount('#app');
});