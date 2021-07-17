import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/**
 * 页面的渲染是无法脱离数据的，服务的渲染亦是如此
 * 因此需要在开始进行页面渲染前，预取和解析好数据
 * 
 * ! 但是我们应该保证在客户端完成mount（挂载）前，可以获取到与服务器应用完成相同的数据
 * ! 否则，就会因为客户端程序与服务器应用之间不同的数据状态，导致混合（hydrate）失败
 * 
 * ? 这个地方有疑问，使用Vuex可能只是让数据处理统一方便维护成本小，并不是解决上述问题的解决方案
 * 为了解决这个问题，页面渲染依赖数据应该位于视图组件之外，放置在专门的状态容器中(state container)，所以需要Vuex
 */


// 创建store实例的工厂方法，保证每一个请求都有不同的store实例
export default function createVueStore() {
  return new Vuex.Store({
    state: {
      today: ''
    },
    mutations: {
      setToday(state, payload) {
        state.today = payload;
      }
    },
    actions: {
      fetchToday({ commit }) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(new Date().toString());
          }, 500);
        }).then(data => {
          commit('setToday', data);
        });
      }
    }
  });
}