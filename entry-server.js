import { createVueApp } from "./app";

export default context => {
  // 因为异步路由，所有返回一个Promise
  // 以便服务器可以等待的所有的内容，在render前就已经就绪
  return new Promise((resolve, reject) => {
    const { app, router, store } = createVueApp();

    // 路由跳转,锁定服务端router
    // ? 此处是否可以使用replace方法替代
    router.push(context.url);
    
    // 等待router将可能的异步组件和钩子函数解析完
    // * https://router.vuejs.org/zh/api/#router-onready
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents || !matchedComponents.length) {
        reject({ code: 404, message: 'page not found' });
        return;
      }

      // 对所有匹配到的路由组件调用asyncData方法
      Promise.all(matchedComponents.map(component => {
        if (component.asyncData) {
          return component.asyncData({ router, store, ...context });
        }
      })).then(() => {
        // 在所有的预取钩子（pre fetch hook）resovle后
        // store已经完成了所需数据的填充
        // 此时我们将store添加到渲染上下文context中
        // 当进行renderToString时，如果模板(template)的渲染上下文(render context)有state
        // 则会进行序列表并以window.__INITIAL_STATE__的形式内联到页面
        // * https://ssr.vuejs.org/zh/api/#template
        context.state = store.state;
        // 注意返回Vue实例
        resolve(app);
      });
    }, reject);
  });
}