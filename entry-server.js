import { createVueApp } from "./app";

export default context => {
  // 因为异步路由，所有返回一个Promise
  // 以便服务器可以等待的所有的内容，在render前就已经就绪
  return new Promise((resolve, reject) => {
    const { app, router } = createVueApp();
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
      // 注意返回Vue实例
      resolve(app);
    }, reject);
  });
}